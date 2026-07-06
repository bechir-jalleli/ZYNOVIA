import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { isAdmin } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function GET(req: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return NextResponse.json(
            { message: 'Google Client ID and Secret must be configured in environment variables.' },
            { status: 400 }
        );
    }

    // Determine host & protocol dynamically to generate redirect URI
    const host = req.headers.get('host');
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    const redirectUri = `${proto}://${host}/api/auth/google/callback`;

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
    );

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/drive.file'],
    });

    return NextResponse.redirect(authUrl);
}
