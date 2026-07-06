import { google } from 'googleapis';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';

/**
 * Google Drive folder ID where formation PDFs are stored.
 * Mon Drive → zynovia → formation
 */
const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '11CDbNjORIpQmmd7wzwFtPg9UMkTZp2vf';

export class DriveServiceError extends Error {
    constructor(
        message: string,
        public readonly code: 'AUTH_FAILED' | 'UPLOAD_FAILED' | 'DELETE_FAILED' | 'NOT_FOUND'
    ) {
        super(message);
        this.name = 'DriveServiceError';
    }
}

/**
 * Builds a Google Drive API client authenticated via OAuth 2.0.
 * Retrieves token from environment variables.
 */
async function getDriveClient() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken || refreshToken === 'your_token_here') {
        throw new DriveServiceError(
            'Google Drive integration is not connected. GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_DRIVE_REFRESH_TOKEN must be configured in environment variables.',
            'AUTH_FAILED'
        );
    }

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret
    );

    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

    return google.drive({ version: 'v3', auth: oauth2Client });
}

/**
 * Uploads a PDF buffer to the "zynovia/formation" Google Drive folder.
 * Returns the public (shareable) URL of the uploaded file.
 */
export async function uploadPdfToDrive(
    buffer: Buffer,
    originalName?: string
): Promise<string> {
    try {
        const drive = await getDriveClient();
        const fileName = originalName
            ? `${originalName.replace(/\.pdf$/i, '')}-${randomUUID()}.pdf`
            : `formation-${randomUUID()}.pdf`;

        const stream = Readable.from(buffer);

        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [DRIVE_FOLDER_ID],
                mimeType: 'application/pdf',
            },
            media: {
                mimeType: 'application/pdf',
                body: stream,
            },
            fields: 'id, name, webViewLink, webContentLink',
        }).catch((err: Error & { code?: number }) => {
            if (err.code === 404) {
                throw new DriveServiceError(
                    `Le dossier Google Drive (ID: ${DRIVE_FOLDER_ID}) est introuvable. ` +
                    `Veuillez vérifier que le dossier existe dans votre Google Drive.`,
                    'UPLOAD_FAILED'
                );
            }
            throw err;
        });

        const fileId = response.data.id;
        if (!fileId) {
            throw new Error('Google Drive returned no file ID after upload.');
        }

        // Make the file publicly readable so anyone with the link can view/download it
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Return a direct download/view link
        const viewLink = `https://drive.google.com/file/d/${fileId}/view`;
        console.log('[DriveService] Uploaded PDF to Drive:', viewLink, `(${fileName})`);
        return viewLink;
    } catch (error) {
        if (error instanceof DriveServiceError) throw error;
        const message = error instanceof Error ? error.message : 'Failed to upload PDF to Google Drive';
        throw new DriveServiceError(message, 'UPLOAD_FAILED');
    }
}

/**
 * Deletes a PDF from Google Drive by its view URL.
 * Silently ignores non-Drive URLs or missing files.
 */
export async function deletePdfFromDrive(pdfUrl?: string | null): Promise<void> {
    if (!pdfUrl?.includes('drive.google.com')) return;

    // Extract file ID from URL formats:
    //   https://drive.google.com/file/d/<fileId>/view
    //   https://drive.google.com/open?id=<fileId>
    const match =
        pdfUrl.match(/\/file\/d\/([^/]+)/) ||
        pdfUrl.match(/[?&]id=([^&]+)/);

    if (!match?.[1]) {
        console.warn('[DriveService] Could not extract file ID from URL:', pdfUrl);
        return;
    }

    const fileId = match[1];

    try {
        const drive = await getDriveClient();
        await drive.files.delete({ fileId });
        console.log('[DriveService] Deleted from Drive:', fileId);
    } catch (error) {
        // 404 = already gone, that's fine
        const status = (error as { code?: number }).code;
        if (status === 404) return;
        console.error('[DriveService] Failed to delete PDF from Drive:', fileId, error);
    }
}

/**
 * Replaces an old Drive PDF with a new one (deletes old if URL changed).
 */
export async function replaceStoredPdfOnDrive(
    oldUrl?: string | null,
    newUrl?: string | null
): Promise<void> {
    if (oldUrl && oldUrl !== newUrl) {
        await deletePdfFromDrive(oldUrl);
    }
}
