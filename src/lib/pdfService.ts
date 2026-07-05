import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const PROGRAMMES_DIR = path.join(process.cwd(), 'public', 'uploads', 'programmes');
const MAX_PDF_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export class PdfServiceError extends Error {
    constructor(
        message: string,
        public readonly code: 'INVALID_FORMAT' | 'FILE_TOO_LARGE' | 'SAVE_FAILED' | 'DELETE_FAILED'
    ) {
        super(message);
        this.name = 'PdfServiceError';
    }
}

async function ensureDir(): Promise<void> {
    if (!existsSync(PROGRAMMES_DIR)) {
        await mkdir(PROGRAMMES_DIR, { recursive: true });
    }
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
 * Saves a PDF buffer to public/uploads/programmes/<uuid>.pdf
 * Returns the public path: /uploads/programmes/<uuid>.pdf
 */
export async function savePdfLocally(buffer: Buffer): Promise<string> {
    try {
        await ensureDir();
        const filename = `${randomUUID()}.pdf`;
        const filepath = path.join(PROGRAMMES_DIR, filename);
        await writeFile(filepath, buffer);
        return `/uploads/programmes/${filename}`;
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to save PDF';
        throw new PdfServiceError(message, 'SAVE_FAILED');
    }
}

/**
 * Deletes a PDF stored at a public path like /uploads/programmes/xxx.pdf
 * Silently ignores missing files.
 */
export async function deletePdfLocally(publicPath?: string | null): Promise<void> {
    if (!publicPath?.startsWith('/uploads/programmes/')) return;
    try {
        const absolutePath = path.join(process.cwd(), 'public', publicPath);
        await unlink(absolutePath);
        console.log('[PdfService] Deleted PDF:', publicPath);
    } catch (error: any) {
        // ENOENT = file already gone, safe to ignore
        if (error?.code !== 'ENOENT') {
            console.error('[PdfService] Failed to delete PDF:', publicPath, error);
        }
    }
}

/**
 * Deletes the old PDF if the path has changed.
 */
export async function replaceStoredPdf(
    oldPath?: string | null,
    newPath?: string | null
): Promise<void> {
    if (oldPath && oldPath !== newPath) {
        await deletePdfLocally(oldPath);
    }
}
