/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

function loadEnvFile(filename) {
    const filePath = path.join(process.cwd(), filename);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) continue;

        const key = trimmed.slice(0, separatorIndex).trim();
        const rawValue = trimmed.slice(separatorIndex + 1).trim();
        const value = rawValue.replace(/^['"]|['"]$/g, '');

        if (!process.env[key]) {
            process.env[key] = value;
        }
    }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const required = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missing = required.filter((key) => !process.env[key]?.trim());

if (missing.length > 0) {
    console.error('[Cloudinary] FAILED — missing environment variables:', missing.join(', '));
    process.exit(1);
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

cloudinary.api
    .ping()
    .then((result) => {
        if (result?.status === 'ok') {
            console.log(`[Cloudinary] OK — connected to cloud "${process.env.CLOUDINARY_CLOUD_NAME}"`);
            process.exit(0);
        }

        console.error('[Cloudinary] FAILED — unexpected ping response:', result);
        process.exit(1);
    })
    .catch((error) => {
        const apiMessage = error?.error?.message || error?.message;
        const httpCode = error?.error?.http_code || error?.http_code;
        const parsed = apiMessage
            ? httpCode
                ? `${apiMessage} (HTTP ${httpCode})`
                : apiMessage
            : String(error);

        console.error('[Cloudinary] FAILED —', parsed);

        if (parsed.toLowerCase().includes('cloud_name mismatch')) {
            console.error(
                '[Cloudinary] Fix: CLOUDINARY_CLOUD_NAME must match your API key/secret.',
                'Copy all three from https://console.cloudinary.com/settings/api-keys'
            );
        }

        process.exit(1);
    });
