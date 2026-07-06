/**
 * cloudinary.service.ts
 *
 * Thin wrapper around the Cloudinary SDK for uploading and deleting
 * raw (non-image) files such as PDF parts.
 *
 * Uses upload_stream (piped buffer) instead of base64 data URIs so that
 * large PDFs (10 MB – 200 MB) are transferred efficiently without the
 * ~33 % base64 overhead or in-memory string blowup.
 */

import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

// ── Config ────────────────────────────────────────────────────────────────────

export class CloudinaryServiceError extends Error {
    constructor(
        message: string,
        public readonly code:
            | 'CONFIG'
            | 'UPLOAD_FAILED'
            | 'DELETE_FAILED'
    ) {
        super(message);
        this.name = 'CloudinaryServiceError';
    }
}

function ensureCloudinaryConfig(): void {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        throw new CloudinaryServiceError(
            'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
            'CONFIG'
        );
    }

    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
    });
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RawUploadResult {
    /** Public HTTPS URL of the stored file */
    url: string;
    /** Cloudinary public_id used for deletion */
    publicId: string;
    /** Reported byte size from Cloudinary */
    bytes: number;
}

// ── Upload ────────────────────────────────────────────────────────────────────

/**
 * Upload a raw buffer (PDF, etc.) to Cloudinary as resource_type 'raw'.
 *
 * Uses upload_stream so the buffer is piped directly — no base64 encoding,
 * no in-memory string blowup. Safe for files from 1 KB up to 200 MB+.
 *
 * @param buffer   File bytes
 * @param folder   Cloudinary folder path (e.g. "pixelize/formations/pdfs")
 * @param filename Desired public_id stem (no extension needed)
 */
export async function uploadRawToCloudinary(
    buffer: Buffer,
    folder: string,
    filename: string
): Promise<RawUploadResult> {
    ensureCloudinaryConfig();

    return new Promise<RawUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                public_id: filename,
                resource_type: 'raw',
                unique_filename: false,
                overwrite: true,
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error || !result) {
                    const msg = error?.message ?? 'Cloudinary upload_stream returned no result';
                    console.error('[CloudinaryService] upload_stream error', {
                        folder,
                        filename,
                        httpCode: error?.http_code,
                        error: msg,
                    });
                    reject(new CloudinaryServiceError(msg, 'UPLOAD_FAILED'));
                    return;
                }

                if (!result.secure_url || !result.public_id) {
                    reject(new CloudinaryServiceError(
                        'Cloudinary upload returned incomplete metadata (missing secure_url or public_id)',
                        'UPLOAD_FAILED'
                    ));
                    return;
                }

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                    bytes: result.bytes ?? buffer.length,
                });
            }
        );

        // Pipe the buffer into the upload stream
        Readable.from(buffer).pipe(uploadStream);
    });
}

// ── Delete ────────────────────────────────────────────────────────────────────

/**
 * Delete a raw resource from Cloudinary by its public_id.
 * Silently ignores missing resources.
 */
export async function deleteRawFromCloudinary(publicId: string): Promise<void> {
    if (!publicId?.trim()) return;

    ensureCloudinaryConfig();

    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
        if (result.result !== 'ok' && result.result !== 'not found') {
            throw new Error(`Unexpected delete result: ${result.result}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Cloudinary delete failed';
        throw new CloudinaryServiceError(message, 'DELETE_FAILED');
    }
}
