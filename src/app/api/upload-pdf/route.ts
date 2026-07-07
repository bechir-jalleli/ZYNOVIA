/**
 * POST /api/upload-pdf
 *
 * Admin endpoint used by the formations page to upload programme PDFs.
 *
 * Cloudinary free plan limits: 10 MB per file.
 * Strategy:
 *   - File < 9 MB  → upload directly to Cloudinary, return the Cloudinary URL
 *   - File >= 9 MB → split into page-based chunks (each < 9 MB),
 *                    upload each chunk, save PdfFile + PdfPart records in DB,
 *                    return a /api/pdf-download/<fileId> URL that merges on demand
 *
 * Contract (unchanged — admin page depends on this):
 *   Request:  multipart/form-data, field "file" → application/pdf
 *   Response: { path: "<url>" }
 *
 * The returned URL is stored in Formation.programmePdfPath and used as
 * a direct link (small files) or merged download link (split files).
 */

import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/adminAuth';
import { uploadRawToCloudinary, CloudinaryServiceError } from '@/services/cloudinary.service';
import {
    splitPdf,
    getPdfPageCount,
    PdfSplitError,
    CLOUDINARY_MAX_BYTES,
    SAFE_CHUNK_BYTES,
} from '@/services/pdfSplit.service';
import connectToDatabase from '@/lib/mongodb';
import PdfFile from '@/models/PdfFile';
import PdfPart from '@/models/PdfPart';
import PdfUploadChunk from '@/models/PdfUploadChunk';

export const runtime = 'nodejs';
export const maxDuration = 120;

const MAX_PDF_SIZE_BYTES = 200 * 1024 * 1024; // 200 MB overall cap

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Strip the extension and every character that Cloudinary rejects in a
 * public_id.  Cloudinary allows: letters, digits, underscore, hyphen, dot,
 * forward-slash (for folder separators) and tilde.  We are even stricter:
 * we only keep alphanumeric, underscores and hyphens so the resulting
 * public_id is always URL-safe and shell-safe.
 */
function sanitiseFilename(name: string): string {
    return (name ?? '')
        .replace(/\.pdf$/i, '')           // strip .pdf extension
        .replace(/[^a-zA-Z0-9_-]/g, '_') // replace every other char with _
        .replace(/_+/g, '_')              // collapse consecutive underscores
        .replace(/^_|_$/g, '')            // trim leading/trailing underscores
        || 'upload';
}

// ── Handler ────────────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<NextResponse> {
    // 1. Admin-only
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 2. Parse form
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const uploadId = formData.get('uploadId') as string | null;
        const chunkIndexRaw = formData.get('chunkIndex') as string | null;
        const totalChunksRaw = formData.get('totalChunks') as string | null;
        const fileNameRaw = formData.get('fileName') as string | null;
        const fileSizeRaw = formData.get('fileSize') as string | null;

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const chunkIndex = chunkIndexRaw ? parseInt(chunkIndexRaw, 10) : 0;
        const totalChunks = totalChunksRaw ? parseInt(totalChunksRaw, 10) : 1;
        const originalName = fileNameRaw || file.name || 'upload.pdf';
        const fileSize = fileSizeRaw ? parseInt(fileSizeRaw, 10) : file.size;

        if (fileSize > MAX_PDF_SIZE_BYTES) {
            return NextResponse.json(
                { message: `PDF exceeds the maximum allowed size of ${MAX_PDF_SIZE_BYTES / (1024 * 1024)} MB.`, code: 'FILE_TOO_LARGE' },
                { status: 400 }
            );
        }

        const isPdf = file.type === 'application/pdf' || originalName.toLowerCase().endsWith('.pdf');
        if (!isPdf) {
            return NextResponse.json(
                { message: `Invalid file type. Only PDF files are accepted.`, code: 'INVALID_FORMAT' },
                { status: 400 }
            );
        }

        if (file.size === 0) {
            return NextResponse.json({ message: 'Uploaded file is empty.', code: 'INVALID_FORMAT' }, { status: 400 });
        }

        // 3. Read chunk buffer
        const chunkBuffer = Buffer.from(await file.arrayBuffer());

        let buffer: Buffer;

        if (totalChunks <= 1 || !uploadId) {
            buffer = chunkBuffer;
        } else {
            // Save chunk to MongoDB
            await connectToDatabase();
            await PdfUploadChunk.updateOne(
                { uploadId, chunkIndex },
                { uploadId, chunkIndex, totalChunks, data: chunkBuffer },
                { upsert: true }
            );

            const uploadedCount = await PdfUploadChunk.countDocuments({ uploadId });
            if (uploadedCount < totalChunks) {
                return NextResponse.json({ status: 'chunk_saved', chunkIndex, totalChunks });
            }

            // All chunks uploaded! Merge.
            const chunkDocs = await PdfUploadChunk.find({ uploadId }).sort({ chunkIndex: 1 });
            if (chunkDocs.length !== totalChunks) {
                return NextResponse.json(
                    { message: 'Upload count mismatch. Some chunks are missing. Please retry.', code: 'UPLOAD_FAILED' },
                    { status: 400 }
                );
            }

            buffer = Buffer.concat(chunkDocs.map(c => c.data));

            // Clean up chunks
            await PdfUploadChunk.deleteMany({ uploadId });
        }

        const baseName = sanitiseFilename(originalName);

        // ── Path A: small file — upload directly ─────────────────────────────
        const needsSplit = buffer.length >= SAFE_CHUNK_BYTES;
        if (!needsSplit) {
            const filename = `${baseName}-${Date.now()}`;
            const result = await uploadRawToCloudinary(buffer, 'pixelize/formations/pdfs', filename);

            console.log('[PdfUpload] Direct upload →', result.url, `(${(file.size / 1024).toFixed(1)} KB)`);
            return NextResponse.json({ path: result.url });
        }

        // ── Path B: large file — split, upload parts, return download URL ────

        // 4. Get page count for the parent record
        let pageCount: number;
        try {
            pageCount = await getPdfPageCount(buffer);
        } catch (err) {
            const msg = err instanceof PdfSplitError ? err.message : 'Could not read PDF page count.';
            return NextResponse.json({ message: msg, code: 'INVALID_FORMAT' }, { status: 422 });
        }

        // 5. Split into page-based chunks (each < 9 MB)
        let chunks;
        try {
            chunks = await splitPdf(buffer);
        } catch (err) {
            const msg = err instanceof PdfSplitError ? err.message : 'PDF split failed.';
            return NextResponse.json({ message: msg, code: 'SPLIT_FAILED' }, { status: 422 });
        }

        if (chunks.length === 1 && chunks[0].buffer.length >= SAFE_CHUNK_BYTES) {
            return NextResponse.json(
                {
                    message: 'PDF could not be split into parts small enough for Cloudinary. Try compressing the file.',
                    code: 'SPLIT_FAILED',
                },
                { status: 422 }
            );
        }

        for (const chunk of chunks) {
            if (chunk.buffer.length > CLOUDINARY_MAX_BYTES) {
                return NextResponse.json(
                    {
                        message: `Split part ${chunk.partIndex + 1} is ${(chunk.buffer.length / (1024 * 1024)).toFixed(1)} MB, which exceeds Cloudinary's 10 MB limit.`,
                        code: 'SPLIT_FAILED',
                    },
                    { status: 422 }
                );
            }
        }

        console.log(`[PdfUpload] File is ${(buffer.length / (1024 * 1024)).toFixed(1)} MB — split into ${chunks.length} parts`);

        // 6. Create parent PdfFile record
        await connectToDatabase();

        const pdfFileDoc = await PdfFile.create({
            originalName: baseName,  // already sanitised — safe for filenames & Cloudinary
            sizeBytes: file.size,
            pageCount,
            totalParts: 0,
            status: 'pending',
        });

        const fileId = (pdfFileDoc._id as { toString(): string }).toString();
        const folder = `pixelize/formations/pdfs/${fileId}`;

        // 7. Upload each chunk to Cloudinary
        const partDocs = [];
        try {
            for (const chunk of chunks) {
                const partName = `${baseName}_part${chunk.partIndex + 1}of${chunks.length}-${Date.now()}`;
                const uploadResult = await uploadRawToCloudinary(chunk.buffer, folder, partName);

                partDocs.push({
                    fileId: pdfFileDoc._id,
                    cloudinaryUrl: uploadResult.url,
                    cloudinaryPublicId: uploadResult.publicId,
                    startPage: chunk.startPage,
                    endPage: chunk.endPage,
                    partIndex: chunk.partIndex,
                    sizeBytes: uploadResult.bytes,
                });

                console.log(`[PdfUpload] Part ${chunk.partIndex + 1}/${chunks.length} uploaded → ${uploadResult.url} (${(chunk.buffer.length / (1024 * 1024)).toFixed(1)} MB)`);
            }
        } catch (err) {
            // Mark record as error so it doesn't stay pending
            await PdfFile.findByIdAndUpdate(fileId, {
                status: 'error',
                errorMessage: err instanceof Error ? err.message.slice(0, 500) : 'Upload failed',
            }).catch(() => {});
            throw err; // re-throw to outer catch
        }

        // 8. Save parts + mark parent as ready
        await PdfPart.insertMany(partDocs);
        await PdfFile.findByIdAndUpdate(fileId, { status: 'ready', totalParts: chunks.length });

        // 9. Return a local merge-and-download URL
        const downloadPath = `/api/pdf-download/${fileId}`;
        console.log(`[PdfUpload] Split upload complete → ${downloadPath} (${chunks.length} parts)`);

        return NextResponse.json({ path: downloadPath });

    } catch (error) {
        if (error instanceof CloudinaryServiceError) {
            const status = error.code === 'CONFIG' ? 500 : 502;
            return NextResponse.json({ message: error.message, code: error.code }, { status });
        }
        const message = error instanceof Error ? error.message : 'PDF upload failed';
        console.error('[PdfUpload] Unexpected error:', error);
        return NextResponse.json({ message }, { status: 500 });
    }
}
