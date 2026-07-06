import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST() {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        return NextResponse.json({
            success: true,
            message: 'To disconnect Google Drive, please remove GOOGLE_DRIVE_REFRESH_TOKEN (and/or GOOGLE_SERVICE_ACCOUNT_JSON) from your .env file and restart your server.'
        });
    } catch (error: any) {
        console.error('[GoogleDisconnect] Error:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
