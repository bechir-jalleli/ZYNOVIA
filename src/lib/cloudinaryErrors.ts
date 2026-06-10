type CloudinaryApiError = {
    message?: string;
    http_code?: number;
};

type CloudinaryErrorPayload = {
    error?: CloudinaryApiError;
    message?: string;
    http_code?: number;
};

export function parseCloudinaryError(error: unknown): string {
    if (!error) return 'Unknown Cloudinary error';

    if (typeof error === 'string') return error;

    if (error instanceof Error && error.message && error.message !== '[object Object]') {
        return error.message;
    }

    const payload = error as CloudinaryErrorPayload;
    const apiMessage = payload.error?.message ?? payload.message;
    const httpCode = payload.error?.http_code ?? payload.http_code;

    if (apiMessage && httpCode) {
        return `${apiMessage} (HTTP ${httpCode})`;
    }

    if (apiMessage) {
        return apiMessage;
    }

    try {
        return JSON.stringify(error);
    } catch {
        return 'Cloudinary request failed';
    }
}

export function getCloudinaryMismatchHint(message: string): string | null {
    if (!message.toLowerCase().includes('cloud_name mismatch')) {
        return null;
    }

    return (
        'CLOUDINARY_CLOUD_NAME does not match CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET. ' +
        'Open https://console.cloudinary.com/settings/api-keys and copy all three values from the same account.'
    );
}
