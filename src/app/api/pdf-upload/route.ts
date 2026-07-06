/**
 * POST /api/pdf-upload
 *
 * Accepts a multipart/form-data request with a `file` field containing a PDF.
 *
 * Flow:
 *  1. Auth check (admin only)
 *  2. Parse & validate file (must be application/pdf)
 *  3. Read into Buffer
 *  4. Load with pdf-lib → get pageCount
 *  5. Create PdfFile doc (status: 'pending')
 *  6. Split if >= 10 MB, else treat as single part
 *  7. Upload each part to Cloudinary (pixelize/pdfs/<fileId>/)
 *  8. Save PdfPart docs
 *  9. Mark PdfFile as 'ready'
 * 10. Return { fileId, pageCount, totalParts, parts[] }
 *
 * On any error after the PdfFile doc is created, status is set to 'error'
 * so the record is not left dangling as 'pending'.
 */

import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/adminAuth';
import connectToDatabase from '@/lib/mongodb';
import PdfFile from '@/models/PdfFile';
import PdfPart from '@/models/PdfPart';
import { splitPdf, getPdfPageCount, PdfSplitError, CLOUDINARY_MAX_BYTES } from '@/services/pdfSplit.service';
import { uploadRawToCloudinary, CloudinaryServiceError } from '@/services/cloudinary.service';
import { HttpError, toErrorResponse } from '@/utils/httpError';

export const runtime = 'nodejs';
// Allow up to 300 s for very large files — Vercel Pro supports up to 300 s
export const maxDuration = 300;

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<NextResponse> {
    // 1. Auth
    if (!(await isAdmin())) {
        return toErrorResponse(new HttpError('UNAUTHORIZED', 'Admin access required'));
    }

    let fileId: string | null = null;

    try {
        // 2. Parse multipart form
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            throw new HttpError('BAD_REQUEST', 'No file provided. Use field name "file".');
        }

        if (file.type !== 'application/pdf') {
            throw new HttpError(
                'BAD_REQUEST',
                `Invalid file type "${file.type}". Only application/pdf is accepted.`
            );
        }

        if (file.size === 0) {
            throw new HttpError('BAD_REQUEST', 'Uploaded file is empty.');
        }

        // 3. Read into memory
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 4. Validate & get page count
        let pageCount: number;
        try {
            pageCount = await getPdfPageCount(buffer);
        } catch (error) {
            if (error instanceof PdfSplitError) {
                throw new HttpError('UNPROCESSABLE', error.message);
            }
            throw error;
        }

        // 5. Persist parent record
        await connectToDatabase();

        const pdfFileDoc = await PdfFile.create({
            originalName: sanitiseFilename(file.name),
            sizeBytes: file.size,
            pageCount,
            totalParts: 0,
            status: 'pending',
        });

        fileId = (pdfFileDoc._id as { toString(): string }).toString();

        // 6. Split (or keep whole)
        let chunks;
        try {
            chunks = await splitPdf(buffer);
        } catch (error) {
            await markError(fileId, error instanceof Error ? error.message : 'Split failed');
            if (error instanceof PdfSplitError) {
                throw new HttpError('UNPROCESSABLE', error.message);
            }
            throw error;
        }

        for (const chunk of chunks) {
            if (chunk.buffer.length > CLOUDINARY_MAX_BYTES) {
                await markError(
                    fileId,
                    `Part ${chunk.partIndex + 1} is ${(chunk.buffer.length / (1024 * 1024)).toFixed(1)} MB (Cloudinary limit 10 MB)`
                );
                throw new HttpError(
                    'UNPROCESSABLE',
                    `Split part ${chunk.partIndex + 1} exceeds Cloudinary's 10 MB limit. Compress the PDF and retry.`
                );
            }
        }

        // 7 & 8. Upload each chunk and save PdfPart docs
        const folder = `pixelize/pdfs/${fileId}`;
        const partDocs = [];

        for (const chunk of chunks) {
            const filename = `part_${String(chunk.partIndex).padStart(4, '0')}`;

            let uploadResult;
            try {
                uploadResult = await uploadRawToCloudinary(chunk.buffer, folder, filename);
            } catch (error) {
                await markError(fileId, error instanceof Error ? error.message : 'Upload failed');
                if (error instanceof CloudinaryServiceError) {
                    throw new HttpError('INTERNAL_ERROR', `Cloudinary upload failed: ${error.message}`);
                }
                throw error;
            }

            partDocs.push({
                fileId: pdfFileDoc._id,
                cloudinaryUrl: uploadResult.url,
                cloudinaryPublicId: uploadResult.publicId,
                startPage: chunk.startPage,
                endPage: chunk.endPage,
                partIndex: chunk.partIndex,
                sizeBytes: uploadResult.bytes,
            });
        }

        await PdfPart.insertMany(partDocs);

        // 9. Mark parent as ready
        await PdfFile.findByIdAndUpdate(fileId, {
            status: 'ready',
            totalParts: chunks.length,
        });

        // 10. Respond
        return NextResponse.json(
            {
                fileId,
                originalName: file.name,
                sizeBytes: file.size,
                pageCount,
                totalParts: chunks.length,
                parts: partDocs.map((p) => ({
                    partIndex: p.partIndex,
                    startPage: p.startPage,
                    endPage: p.endPage,
                    sizeBytes: p.sizeBytes,
                    url: p.cloudinaryUrl,
                })),
            },
            { status: 201 }
        );
    } catch (error) {
        // If we have a fileId and the error is unhandled, mark it
        if (fileId) {
            const msg = error instanceof Error ? error.message : 'Unknown error';
            await markError(fileId, msg).catch(() => {});
        }
        return toErrorResponse(error);
    }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function markError(fileId: string, message: string): Promise<void> {
    try {
        await PdfFile.findByIdAndUpdate(fileId, {
            status: 'error',
            errorMessage: message.slice(0, 500),
        });
    } catch {
        // Best-effort — don't throw
    }
}

/**
 * Strip path traversal characters from the filename.
 * Returns 'upload.pdf' if name is empty after sanitisation.
 */
function sanitiseFilename(name: string): string {
    const safe = (name ?? '')
        .replace(/[/\\:*?"<>|]/g, '_')
        .replace(/\.{2,}/g, '_')
        .trim();
    return safe || 'upload.pdf';
}
