/**
 * pdfMerge.service.ts
 *
 * Merges an ordered list of PDF buffers back into a single PDF using pdf-lib.
 *
 * Pages are copied in partIndex order, preserving exact page ordering.
 * The result is a valid, self-contained PDF identical in content to the original.
 */

import { PDFDocument } from 'pdf-lib';

export class PdfMergeError extends Error {
    constructor(message: string, public readonly cause?: unknown) {
        super(message);
        this.name = 'PdfMergeError';
    }
}

/**
 * Merge an ordered array of PDF buffers into a single PDF buffer.
 *
 * @param buffers  Ordered array of PDF byte buffers (one per part)
 * @returns        Merged PDF as a Node.js Buffer
 */
export async function mergePdfBuffers(buffers: Buffer[]): Promise<Buffer> {
    if (buffers.length === 0) {
        throw new PdfMergeError('No PDF buffers provided to merge.');
    }

    // Optimisation: if there is only one part, return it directly (no re-serialisation)
    if (buffers.length === 1) {
        return buffers[0];
    }

    const mergedDoc = await PDFDocument.create();

    for (let i = 0; i < buffers.length; i++) {
        let srcDoc: PDFDocument;

        try {
            srcDoc = await PDFDocument.load(buffers[i]);
        } catch (error) {
            throw new PdfMergeError(
                `Failed to parse PDF part ${i + 1} of ${buffers.length}. Part may be corrupt.`,
                error
            );
        }

        const totalPages = srcDoc.getPageCount();
        if (totalPages === 0) continue; // Skip empty parts (shouldn't happen, but be safe)

        const pageIndices = Array.from({ length: totalPages }, (_, idx) => idx);

        try {
            const copiedPages = await mergedDoc.copyPages(srcDoc, pageIndices);
            copiedPages.forEach((page) => mergedDoc.addPage(page));
        } catch (error) {
            throw new PdfMergeError(
                `Failed to copy pages from part ${i + 1} of ${buffers.length}.`,
                error
            );
        }
    }

    try {
        const mergedBytes = await mergedDoc.save();
        return Buffer.from(mergedBytes);
    } catch (error) {
        throw new PdfMergeError('Failed to serialise merged PDF.', error);
    }
}
