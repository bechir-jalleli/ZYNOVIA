import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { unlink } from 'fs/promises';
import path from 'path';
import { getCloudinaryMismatchHint, parseCloudinaryError } from '@/lib/cloudinaryErrors';

export type ImageEntity = 'formations' | 'bootcamps' | 'projects' | 'reviews' | 'trainers';

const ENTITY_FOLDERS: Record<ImageEntity, string> = {
    formations: 'pixelize/formations',
    bootcamps: 'pixelize/bootcamps',
    projects: 'pixelize/projects',
    reviews: 'pixelize/reviews',
    trainers: 'pixelize/trainers',
};

const ALLOWED_MIME_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
]);

const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB

export interface ImageUploadResult {
    url: string;
    publicId: string;
}

export class ImageServiceError extends Error {
    constructor(
        message: string,
        public readonly code: 'CONFIG' | 'INVALID_FORMAT' | 'FILE_TOO_LARGE' | 'UPLOAD_FAILED' | 'DELETE_FAILED' | 'MISSING_REFERENCE'
    ) {
        super(message);
        this.name = 'ImageServiceError';
    }
}

function ensureCloudinaryConfig() {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        throw new ImageServiceError(
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

export function validateImageFile(file: { type: string; size: number; name?: string }) {
    const mime = file.type || detectMimeFromExtension(file.name);

    if (!ALLOWED_MIME_TYPES.has(mime)) {
        throw new ImageServiceError(
            `Invalid image format. Allowed: JPEG, PNG, WebP, GIF, AVIF. Received: ${mime || 'unknown'}`,
            'INVALID_FORMAT'
        );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        throw new ImageServiceError(
            `Image exceeds maximum size of ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB.`,
            'FILE_TOO_LARGE'
        );
    }

    return mime;
}

export function isCloudinaryUrl(url?: string | null): boolean {
    if (!url) return false;
    return url.includes('res.cloudinary.com');
}

export function isLocalUploadPath(url?: string | null): boolean {
    if (!url) return false;
    return url.startsWith('/uploads/');
}

export async function uploadImageToCloudinary(
    buffer: Buffer,
    entity: ImageEntity,
    filename?: string,
    mimeType?: string
): Promise<ImageUploadResult> {
    ensureCloudinaryConfig();

    const detectedMime = mimeType || detectMimeFromBuffer(buffer, filename);
    validateImageFile({ type: detectedMime, size: buffer.length, name: filename });

    const folder = ENTITY_FOLDERS[entity];
    const dataUri = `data:${detectedMime};base64,${buffer.toString('base64')}`;

    try {
        // Use uploader.upload (data URI) instead of upload_stream — more reliable on Vercel serverless.
        const result: UploadApiResponse = await cloudinary.uploader.upload(dataUri, {
            folder,
            resource_type: 'image',
            unique_filename: true,
            overwrite: false,
        });

        if (!result.secure_url || !result.public_id) {
            throw new Error('Cloudinary upload returned incomplete metadata');
        }

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        const parsed = parseCloudinaryError(error);
        const hint = getCloudinaryMismatchHint(parsed);
        const message = hint ? `${parsed}. ${hint}` : parsed;

        console.error('[ImageUpload] Cloudinary upload failed', {
            entity,
            folder,
            filename,
            mimeType: detectedMime,
            bufferSize: buffer.length,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            error: parsed,
            hint,
        });
        throw new ImageServiceError(message, 'UPLOAD_FAILED');
    }
}

export async function deleteCloudinaryImage(publicId?: string | null): Promise<void> {
    if (!publicId?.trim()) return;

    ensureCloudinaryConfig();

    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
        if (result.result !== 'ok' && result.result !== 'not found') {
            throw new Error(`Unexpected delete result: ${result.result}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Cloudinary delete failed';
        throw new ImageServiceError(message, 'DELETE_FAILED');
    }
}

/** Removes legacy local files and Cloudinary assets when an image is replaced or entity deleted. */
export async function deleteStoredImage(
    url?: string | null,
    publicId?: string | null
): Promise<void> {
    if (publicId) {
        try {
            await deleteCloudinaryImage(publicId);
        } catch (error) {
            console.error('Failed to delete Cloudinary image:', publicId, error);
        }
        return;
    }

    if (isLocalUploadPath(url)) {
        try {
            const absolutePath = path.join(process.cwd(), 'public', url!);
            await unlink(absolutePath);
        } catch (error) {
            console.error('Failed to delete local file:', url, error);
        }
    }
}

export async function replaceStoredImage(
    oldUrl?: string | null,
    oldPublicId?: string | null,
    newUrl?: string | null,
    newPublicId?: string | null
): Promise<void> {
    const imageChanged = oldUrl !== newUrl || oldPublicId !== newPublicId;
    if (!imageChanged) return;

    if (oldPublicId && oldPublicId !== newPublicId) {
        await deleteStoredImage(oldUrl, oldPublicId);
        return;
    }

    if (oldUrl && oldUrl !== newUrl && !oldPublicId) {
        await deleteStoredImage(oldUrl, null);
    }
}

function detectMimeFromExtension(filename?: string): string {
    const ext = filename?.split('.').pop()?.toLowerCase();
    const extToMime: Record<string, string> = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
        gif: 'image/gif',
        avif: 'image/avif',
    };

    return extToMime[ext ?? ''] ?? '';
}

function detectMimeFromBuffer(buffer: Buffer, filename?: string): string {
    if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
        return 'image/jpeg';
    }
    if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
        return 'image/png';
    }
    if (buffer.length >= 12 && buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP') {
        return 'image/webp';
    }
    if (buffer.length >= 6 && (buffer.subarray(0, 6).toString() === 'GIF87a' || buffer.subarray(0, 6).toString() === 'GIF89a')) {
        return 'image/gif';
    }

    return detectMimeFromExtension(filename) || 'application/octet-stream';
}

export function parseImageEntity(value: string | null): ImageEntity | null {
    if (
        value === 'formations' ||
        value === 'bootcamps' ||
        value === 'projects' ||
        value === 'reviews' ||
        value === 'trainers'
    ) {
        return value;
    }
    return null;
}
