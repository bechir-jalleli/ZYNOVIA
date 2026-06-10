import type { ImageEntity } from '@/lib/imageService';

export interface ClientUploadResult {
    url: string;
    publicId: string;
}

export class ClientUploadError extends Error {
    constructor(
        message: string,
        public readonly status?: number,
        public readonly code?: string
    ) {
        super(message);
        this.name = 'ClientUploadError';
    }
}

export async function uploadImageClient(
    file: File,
    entity: ImageEntity
): Promise<ClientUploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('entity', entity);

    const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
        console.error('[ImageUpload] Client upload failed', {
            entity,
            file: { name: file.name, type: file.type, size: file.size },
            status: res.status,
            code: data.code,
            message: data.message,
        });
        throw new ClientUploadError(data.message || 'Image upload failed', res.status, data.code);
    }

    if (!data.url || !data.publicId) {
        console.error('[ImageUpload] Client upload invalid response', {
            entity,
            file: { name: file.name, type: file.type, size: file.size },
            response: data,
        });
        throw new ClientUploadError('Upload response is missing image metadata');
    }

    return {
        url: data.url,
        publicId: data.publicId,
    };
}
