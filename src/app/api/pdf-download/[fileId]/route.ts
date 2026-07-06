/**
 * GET /api/pdf-download/[fileId]
 *
 * Downloads all parts for a given PDF from Cloudinary, merges them
 * back into a single PDF using pdf-lib, and streams the result to the client.
 *
 * Flow:
 *  1. Validate fileId format
 *  2. Fetch PdfFile from DB (must be status: 'ready')
 *  3. Fetch all PdfPart docs sorted by partIndex
 *  4. Download each part from Cloudinary in parallel
 *  5. Merge with pdfMerge.service
 *  6. Return as application/pdf with Content-Disposition: attachment
 */

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import PdfFile from '@/models/PdfFile';
import PdfPart, { IPdfPart } from '@/models/PdfPart';
import { mergePdfBuffers, PdfMergeError } from '@/services/pdfMerge.service';
import { HttpError, toErrorResponse } from '@/utils/httpError';

export const runtime = 'nodejs';
// Allow up to 300 s for very large merges
export const maxDuration = 300;

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ fileId: string }> }
): Promise<NextResponse> {
    try {
        const { fileId } = await params;

        // 1. Validate fileId is a Mongo ObjectId
        if (!isValidObjectId(fileId)) {
            throw new HttpError('BAD_REQUEST', 'Invalid fileId format.');
        }

        // 2. Fetch parent record
        await connectToDatabase();

        const pdfFile = await PdfFile.findById(fileId).lean();
        if (!pdfFile) {
            throw new HttpError('NOT_FOUND', `No PDF found with id "${fileId}".`);
        }
        if (pdfFile.status === 'pending') {
            throw new HttpError('CONFLICT', 'PDF is still being processed. Try again shortly.');
        }
        if (pdfFile.status === 'error') {
            throw new HttpError(
                'UNPROCESSABLE',
                `PDF processing failed: ${pdfFile.errorMessage ?? 'unknown error'}`
            );
        }

        // 3. Fetch all parts in order
        const parts = await PdfPart.find({ fileId })
            .sort({ partIndex: 1 })
            .lean<IPdfPart[]>();

        if (parts.length === 0) {
            throw new HttpError('NOT_FOUND', 'No parts found for this file. Record may be corrupt.');
        }

        // 4. Download each part from Cloudinary (parallel, bounded)
        const partBuffers = await downloadParts(parts);

        // 5. Merge
        let mergedBuffer: Buffer;
        try {
            mergedBuffer = await mergePdfBuffers(partBuffers);
        } catch (error) {
            if (error instanceof PdfMergeError) {
                throw new HttpError('INTERNAL_ERROR', `PDF merge failed: ${error.message}`);
            }
            throw error;
        }

        // 6. Respond
        const filename = buildDownloadFilename(pdfFile.originalName);

        return new NextResponse(mergedBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': String(mergedBuffer.length),
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        return toErrorResponse(error);
    }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const CONCURRENCY_LIMIT = 4; // Max parallel Cloudinary downloads

/**
 * Download part buffers from Cloudinary with bounded concurrency.
 * Preserves the order of `parts` in the returned array.
 */
async function downloadParts(parts: IPdfPart[]): Promise<Buffer[]> {
    const results: Buffer[] = new Array(parts.length);

    // Process in batches of CONCURRENCY_LIMIT
    for (let i = 0; i < parts.length; i += CONCURRENCY_LIMIT) {
        const batch = parts.slice(i, i + CONCURRENCY_LIMIT);

        const batchBuffers = await Promise.all(
            batch.map((part) => downloadUrl(part.cloudinaryUrl, part.partIndex))
        );

        batchBuffers.forEach((buf, batchOffset) => {
            results[i + batchOffset] = buf;
        });
    }

    return results;
}

/**
 * Fetch a URL and return its body as a Node.js Buffer.
 * Throws HttpError on network or HTTP failures.
 */
async function downloadUrl(url: string, partIndex: number): Promise<Buffer> {
    let response: Response;

    try {
        response = await fetch(url);
    } catch (error) {
        throw new HttpError(
            'INTERNAL_ERROR',
            `Network error downloading part ${partIndex}: ${error instanceof Error ? error.message : String(error)}`
        );
    }

    if (!response.ok) {
        throw new HttpError(
            'INTERNAL_ERROR',
            `Failed to download part ${partIndex} from Cloudinary (HTTP ${response.status}).`
        );
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

/** Regex for a 24-character hex MongoDB ObjectId */
function isValidObjectId(id: string): boolean {
    return /^[a-f\d]{24}$/i.test(id);
}

/**
 * Build a safe download filename.
 * Preserves the original name but ensures a .pdf extension.
 */
function buildDownloadFilename(originalName: string): string {
    const name = (originalName ?? 'download').replace(/['"]/g, '');
    return name.endsWith('.pdf') ? name : `${name}.pdf`;
}
