/**
 * pdfSplit.service.ts
 *
 * Page-based PDF splitting using pdf-lib.
 *
 * Cloudinary free plan: 10 MB (10_485_760 bytes) per raw file.
 * We target 9 MB per chunk to leave headroom for pdf-lib re-serialisation.
 *
 * Strategy:
 *  - Files <= SAFE_CHUNK_BYTES → single part (no split)
 *  - Larger files → greedy page grouping:
 *      1. Estimate minimum part count from file size
 *      2. Build a chunk from a page range
 *      3. If the chunk is still too large, halve the page range and retry
 *      4. Repeat until every part is under the safe limit (or a single page
 *         exceeds the hard Cloudinary cap — then throw a clear error)
 */

import { PDFDocument } from 'pdf-lib';

/** Cloudinary hard limit (10 MB) */
export const CLOUDINARY_MAX_BYTES = 10 * 1024 * 1024;

/** Target per-part size with headroom below Cloudinary's 10 MB cap */
export const SAFE_CHUNK_BYTES = 9 * 1024 * 1024;

export interface PdfChunk {
    buffer: Buffer;
    startPage: number;   // 1-based, inclusive
    endPage: number;     // 1-based, inclusive
    partIndex: number;   // 0-based order index
}

export class PdfSplitError extends Error {
    constructor(message: string, public readonly cause?: unknown) {
        super(message);
        this.name = 'PdfSplitError';
    }
}

/**
 * Load and split a PDF buffer into ordered chunks that each fit Cloudinary.
 * Always returns at least one chunk.
 */
export async function splitPdf(inputBuffer: Buffer): Promise<PdfChunk[]> {
    let srcDoc: PDFDocument;

    try {
        srcDoc = await PDFDocument.load(inputBuffer, { ignoreEncryption: false });
    } catch (error) {
        throw new PdfSplitError('Failed to parse PDF. File may be corrupt or encrypted.', error);
    }

    const totalPages = srcDoc.getPageCount();

    if (totalPages === 0) {
        throw new PdfSplitError('PDF contains no pages.');
    }

    if (inputBuffer.length <= SAFE_CHUNK_BYTES) {
        return [
            {
                buffer: inputBuffer,
                startPage: 1,
                endPage: totalPages,
                partIndex: 0,
            },
        ];
    }

    const minParts = Math.ceil(inputBuffer.length / SAFE_CHUNK_BYTES);
    const chunks: PdfChunk[] = [];
    let pageIndex = 0; // 0-based
    let partIndex = 0;

    while (pageIndex < totalPages) {
        const pagesRemaining = totalPages - pageIndex;
        const partsRemaining = Math.max(1, minParts - partIndex);

        // Start by spreading remaining pages across the parts we still need
        let tryPages = Math.max(1, Math.ceil(pagesRemaining / partsRemaining));

        while (true) {
            const endIdx = Math.min(pageIndex + tryPages - 1, totalPages - 1);
            const chunk = await buildChunk(srcDoc, pageIndex, endIdx, partIndex);

            if (chunk.buffer.length <= SAFE_CHUNK_BYTES) {
                chunks.push(chunk);
                pageIndex = endIdx + 1;
                partIndex++;
                break;
            }

            if (tryPages <= 1) {
                if (chunk.buffer.length > CLOUDINARY_MAX_BYTES) {
                    throw new PdfSplitError(
                        `Page ${pageIndex + 1} alone is ${formatMb(chunk.buffer.length)} MB, ` +
                        `which exceeds Cloudinary's ${formatMb(CLOUDINARY_MAX_BYTES)} MB limit. ` +
                        'Compress the PDF before uploading.'
                    );
                }
                // Between safe and hard limit — accept as last resort
                chunks.push(chunk);
                pageIndex = endIdx + 1;
                partIndex++;
                break;
            }

            tryPages = Math.max(1, Math.floor(tryPages / 2));
        }
    }

    return chunks;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function buildChunk(
    srcDoc: PDFDocument,
    startIdx: number,
    endIdx: number,
    partIndex: number
): Promise<PdfChunk> {
    const chunkDoc = await PDFDocument.create();
    const pageIndices = range(startIdx, endIdx);
    const copiedPages = await chunkDoc.copyPages(srcDoc, pageIndices);
    copiedPages.forEach((page) => chunkDoc.addPage(page));

    const bytes = await chunkDoc.save();
    const buffer = Buffer.from(bytes);

    return {
        buffer,
        startPage: startIdx + 1,
        endPage: endIdx + 1,
        partIndex,
    };
}

function range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i <= end; i++) result.push(i);
    return result;
}

function formatMb(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(1);
}

export async function getPdfPageCount(buffer: Buffer): Promise<number> {
    try {
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: false });
        return doc.getPageCount();
    } catch (error) {
        throw new PdfSplitError('Could not read PDF page count. File may be corrupt.', error);
    }
}
