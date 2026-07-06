import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const isConnected = !!(
            process.env.GOOGLE_DRIVE_REFRESH_TOKEN &&
            process.env.GOOGLE_DRIVE_REFRESH_TOKEN !== 'your_token_here'
        );
        return NextResponse.json({ isConnected });
    } catch (error: any) {
        console.error('[GoogleStatus] Error fetching status:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
