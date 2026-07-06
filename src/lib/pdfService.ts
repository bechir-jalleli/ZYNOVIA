import {
    uploadPdfToDrive,
    deletePdfFromDrive,
    replaceStoredPdfOnDrive,
    DriveServiceError,
} from './googleDriveService';

const MAX_PDF_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

// Re-export so callers can use PdfServiceError uniformly
export class PdfServiceError extends Error {
    constructor(
        message: string,
        public readonly code: 'INVALID_FORMAT' | 'FILE_TOO_LARGE' | 'SAVE_FAILED' | 'DELETE_FAILED'
    ) {
        super(message);
        this.name = 'PdfServiceError';
    }
}

/** Validates that the file is a PDF and within size limits. */
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
 * Uploads a PDF buffer to Google Drive (Mon Drive → zynovia → formation).
 * Returns the public Drive view URL.
 */
export async function uploadPdfToCloudinary(buffer: Buffer, originalName?: string): Promise<string> {
    try {
        return await uploadPdfToDrive(buffer, originalName);
    } catch (error) {
        if (error instanceof DriveServiceError) {
            throw new PdfServiceError(error.message, 'SAVE_FAILED');
        }
        const message = error instanceof Error ? error.message : 'Failed to upload PDF to Google Drive';
        throw new PdfServiceError(message, 'SAVE_FAILED');
    }
}

/**
 * Deletes a PDF from Google Drive by its URL.
 * Silently ignores non-Drive or missing files.
 */
export async function deletePdfFromCloudinary(pdfUrl?: string | null): Promise<void> {
    try {
        await deletePdfFromDrive(pdfUrl);
    } catch (error) {
        console.error('[PdfService] Failed to delete PDF from Drive:', pdfUrl, error);
    }
}

/**
 * Deletes the old PDF from Drive if the URL has changed.
 */
export async function replaceStoredPdf(
    oldUrl?: string | null,
    newUrl?: string | null
): Promise<void> {
    await replaceStoredPdfOnDrive(oldUrl, newUrl);
}

// ── Legacy aliases (kept for backward-compat) ────────────────────────────────

/** @deprecated Use uploadPdfToCloudinary (now backed by Google Drive) */
export async function savePdfLocally(_buffer: Buffer): Promise<string> {
    throw new PdfServiceError(
        'Local PDF storage is not supported. Use uploadPdfToCloudinary instead.',
        'SAVE_FAILED'
    );
}

/** @deprecated Use deletePdfFromCloudinary (now backed by Google Drive) */
export async function deletePdfLocally(pdfUrl?: string | null): Promise<void> {
    await deletePdfFromDrive(pdfUrl);
}
