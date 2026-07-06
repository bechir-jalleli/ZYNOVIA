import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const runtime = 'nodejs';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Get the base URL for redirection
    const host = req.headers.get('host');
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    const origin = `${proto}://${host}`;

    if (error) {
        console.error('[GoogleOAuthCallback] Google auth error:', error);
        return NextResponse.redirect(`${origin}/admin/settings?google_auth=error&message=${encodeURIComponent(error)}`);
    }

    if (!code) {
        return NextResponse.redirect(`${origin}/admin/settings?google_auth=error&message=Missing+code`);
    }

    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = `${origin}/api/auth/google/callback`;

        const oauth2Client = new google.auth.OAuth2(
            clientId,
            clientSecret,
            redirectUri
        );

        const { tokens } = await oauth2Client.getToken(code);
        const refreshToken = tokens.refresh_token;

        if (!refreshToken) {
            return new NextResponse(
                `<html>
                    <body style="font-family: sans-serif; padding: 2rem; max-width: 600px; margin: auto;">
                        <h1 style="color: #ea4335;">No Refresh Token Returned</h1>
                        <p>Google did not return a refresh token. This usually happens if you have already authenticated. Please go to your Google Account settings, remove access to this app, and try again.</p>
                        <a href="/admin/settings" style="display: inline-block; padding: 0.5rem 1rem; background: #4285f4; color: white; text-decoration: none; border-radius: 4px;">Back to Settings</a>
                    </body>
                </html>`,
                { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            );
        }

        // Return a clean page showing the refresh token to copy
        return new NextResponse(
            `<html>
                <body style="font-family: sans-serif; padding: 2rem; max-width: 600px; margin: auto; background-color: #f8fafc; color: #1e293b;">
                    <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
                        <h1 style="color: #10b981; margin-top: 0;">Authentication Successful!</h1>
                        <p>Please copy the Google Drive Refresh Token below and add it to your <strong>.env</strong> file:</p>
                        <div style="position: relative; background: #f1f5f9; padding: 1rem; border-radius: 8px; font-family: monospace; word-break: break-all; margin: 1.5rem 0; border: 1px solid #cbd5e1; user-select: all;">
                            GOOGLE_DRIVE_REFRESH_TOKEN=${refreshToken}
                        </div>
                        <p style="font-size: 0.875rem; color: #64748b;">Once you have added the token to your environment variables and restarted your server, your Google Drive integration will be fully active.</p>
                        <a href="/admin/settings" style="display: inline-block; padding: 0.75rem 1.5rem; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Return to Settings</a>
                    </div>
                </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
    } catch (err: any) {
        console.error('[GoogleOAuthCallback] Token exchange error:', err);
        return NextResponse.redirect(`${origin}/admin/settings?google_auth=error&message=${encodeURIComponent(err.message || 'Token exchange failed')}`);
    }
}
