import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { randomUUID } from 'crypto';

const MAX_PDF_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
const CLOUDINARY_FOLDER = 'pixelize/programmes';

export class PdfServiceError extends Error {
    constructor(
        message: string,
        public readonly code: 'INVALID_FORMAT' | 'FILE_TOO_LARGE' | 'SAVE_FAILED' | 'DELETE_FAILED'
    ) {
        super(message);
        this.name = 'PdfServiceError';
    }
}

function ensureCloudinaryConfig() {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        throw new PdfServiceError(
            'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
            'SAVE_FAILED'
        );
    }
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
    });
}

export function validatePdfFile(file: { type: string; size: number }) {
    if (file.type !== 'application/pdf') {
        throw new PdfServiceError(
            `Invalid file type. Only PDF files are accepted. Received: ${file.type || 'unknown'}`,
            'INVALID_FORMAT'
        );
    }
    if (file.size > MAX_PDF_SIZE_BYTES) {
        throw new PdfServiceError(
            `PDF exceeds maximum size of ${MAX_PDF_SIZE_BYTES / (1024 * 1024)}MB.`,
            'FILE_TOO_LARGE'
        );
    }
}

/**
 * Uploads a PDF buffer to Cloudinary under pixelize/programmes/<uuid>
 * Returns the Cloudinary secure URL.
 */
export async function uploadPdfToCloudinary(buffer: Buffer): Promise<string> {
    ensureCloudinaryConfig();
    try {
        const publicId = `${CLOUDINARY_FOLDER}/${randomUUID()}`;
        const dataUri = `data:application/pdf;base64,${buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(dataUri, {
            folder: CLOUDINARY_FOLDER,
            public_id: publicId,
            resource_type: 'raw',
            unique_filename: false,
            overwrite: false,
        });

        if (!result.secure_url) {
            throw new Error('Cloudinary upload returned no URL');
        }

        console.log('[PdfService] Uploaded to Cloudinary:', result.secure_url);
        return result.secure_url;
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to upload PDF to Cloudinary';
        throw new PdfServiceError(message, 'SAVE_FAILED');
    }
}

/**
 * Deletes a PDF from Cloudinary by its secure URL.
 * Silently ignores missing files or non-Cloudinary URLs.
 */
export async function deletePdfFromCloudinary(pdfUrl?: string | null): Promise<void> {
    if (!pdfUrl?.includes('res.cloudinary.com')) return;

    ensureCloudinaryConfig();

    try {
        // Extract public_id from the Cloudinary URL
        // URL format: https://res.cloudinary.com/<cloud>/raw/upload/v<ver>/<folder>/<filename>
        const urlObj = new URL(pdfUrl);
        const parts = urlObj.pathname.split('/');
        // Find index after 'upload' to get everything after version
        const uploadIdx = parts.indexOf('upload');
        if (uploadIdx === -1) return;

        // Skip the version segment (v12345)
        const afterUpload = parts.slice(uploadIdx + 1);
        if (afterUpload[0]?.match(/^v\d+$/)) afterUpload.shift();

        // Remove file extension for public_id
        const publicIdWithExt = afterUpload.join('/');
        // Cloudinary raw public_id keeps the extension
        const publicId = publicIdWithExt;

        const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
        if (result.result !== 'ok' && result.result !== 'not found') {
            console.warn('[PdfService] Unexpected Cloudinary delete result:', result.result);
        } else {
            console.log('[PdfService] Deleted from Cloudinary:', publicId);
        }
    } catch (error) {
        console.error('[PdfService] Failed to delete PDF from Cloudinary:', pdfUrl, error);
    }
}

/**
 * Deletes the old PDF from Cloudinary if the path has changed.
 */
export async function replaceStoredPdf(
    oldUrl?: string | null,
    newUrl?: string | null
): Promise<void> {
    if (oldUrl && oldUrl !== newUrl) {
        await deletePdfFromCloudinary(oldUrl);
    }
}

// ── Legacy local-file helpers (kept for backward-compat, no-ops on Vercel) ──

/** @deprecated Use uploadPdfToCloudinary instead */
export async function savePdfLocally(_buffer: Buffer): Promise<string> {
    throw new PdfServiceError(
        'Local PDF storage is not supported on Vercel. Use uploadPdfToCloudinary instead.',
        'SAVE_FAILED'
    );
}

/** @deprecated Use deletePdfFromCloudinary instead */
export async function deletePdfLocally(pdfUrl?: string | null): Promise<void> {
    // If it's a Cloudinary URL (new format), delegate to the proper function
    if (pdfUrl?.includes('res.cloudinary.com')) {
        await deletePdfFromCloudinary(pdfUrl);
        return;
    }
    // Old local paths: silently ignore on Vercel (file doesn't exist)
    if (pdfUrl?.startsWith('/uploads/')) {
        console.warn('[PdfService] Skipping local file delete (not supported on Vercel):', pdfUrl);
    }
}
