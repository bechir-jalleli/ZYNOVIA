import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/adminAuth';
import {
    ImageServiceError,
    parseImageEntity,
    uploadImageToCloudinary,
    validateImageFile,
} from '@/lib/imageService';

export const runtime = 'nodejs';
export const maxDuration = 30;

function logUploadFailure(
    reason: string,
    details: Record<string, unknown>,
    error?: unknown
) {
    console.error('[ImageUpload] Upload failed', {
        reason,
        ...details,
        error:
            error instanceof Error
                ? { name: error.name, message: error.message, stack: error.stack }
                : error,
    });
}

export async function POST(req: Request) {
    let fileMeta: { name: string; type: string; size: number } | null = null;
    let entity: ReturnType<typeof parseImageEntity> = null;

    if (!(await isAdmin())) {
        logUploadFailure('unauthorized', {});
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        entity = parseImageEntity(formData.get('entity') as string | null);

        if (!file) {
            logUploadFailure('missing_file', { entity });
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        fileMeta = { name: file.name, type: file.type, size: file.size };

        if (!entity) {
            logUploadFailure('invalid_entity', { file: fileMeta, rawEntity: formData.get('entity') });
            return NextResponse.json(
                { message: 'Invalid entity. Use: formations, bootcamps, projects, or reviews.' },
                { status: 400 }
            );
        }

        const mimeType = validateImageFile({ type: file.type, size: file.size, name: file.name });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await uploadImageToCloudinary(buffer, entity, file.name, mimeType);

        console.log('[ImageUpload] Upload succeeded', {
            entity,
            file: fileMeta,
            publicId: result.publicId,
            url: result.url,
        });

        return NextResponse.json({
            url: result.url,
            publicId: result.publicId,
            // Backward compatibility for any legacy callers
            filePath: result.url,
        });
    } catch (error) {
        if (error instanceof ImageServiceError) {
            const status =
                error.code === 'INVALID_FORMAT' || error.code === 'FILE_TOO_LARGE'
                    ? 400
                    : error.code === 'CONFIG'
                      ? 503
                      : 500;

            logUploadFailure(error.code, { entity, file: fileMeta }, error);
            return NextResponse.json({ message: error.message, code: error.code }, { status });
        }

        logUploadFailure('unexpected_error', { entity, file: fileMeta }, error);
        const message = error instanceof Error ? error.message : 'Upload failed';
        return NextResponse.json({ message }, { status: 500 });
    }
}
