import { v2 as cloudinary } from 'cloudinary';
import { getCloudinaryMismatchHint, parseCloudinaryError } from '@/lib/cloudinaryErrors';

export type CloudinaryConnectionResult = {
    ok: boolean;
    message: string;
    cloudName?: string;
    details?: string;
};

let hasRunStartupTest = false;

function getMissingEnvVars(): string[] {
    const required = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'] as const;
    return required.filter((key) => !process.env[key]?.trim());
}

export async function testCloudinaryConnection(): Promise<CloudinaryConnectionResult> {
    const missing = getMissingEnvVars();

    if (missing.length > 0) {
        return {
            ok: false,
            message: 'Cloudinary is not configured',
            details: `Missing environment variables: ${missing.join(', ')}`,
        };
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;

    cloudinary.config({
        cloud_name: cloudName,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });

    try {
        const result = await cloudinary.api.ping();

        if (result?.status === 'ok') {
            return {
                ok: true,
                message: 'Cloudinary connection successful',
                cloudName,
                details: `API ping returned status: ${result.status}`,
            };
        }

        return {
            ok: false,
            message: 'Cloudinary ping returned an unexpected response',
            cloudName,
            details: JSON.stringify(result),
        };
    } catch (error) {
        const parsed = parseCloudinaryError(error);
        const hint = getCloudinaryMismatchHint(parsed);

        return {
            ok: false,
            message: 'Cloudinary connection failed',
            cloudName,
            details: hint ? `${parsed}. ${hint}` : parsed,
        };
    }
}

export async function runCloudinaryStartupTest(): Promise<void> {
    if (hasRunStartupTest) return;
    hasRunStartupTest = true;

    const result = await testCloudinaryConnection();

    if (result.ok) {
        console.log(`[Cloudinary] OK — connected to cloud "${result.cloudName}"`);
        if (result.details) {
            console.log(`[Cloudinary] ${result.details}`);
        }
        return;
    }

    console.error('[Cloudinary] FAILED — image uploads will not work');
    console.error(`[Cloudinary] ${result.message}`);
    if (result.details) {
        console.error(`[Cloudinary] ${result.details}`);
    }
    console.error('[Cloudinary] Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env');
}
