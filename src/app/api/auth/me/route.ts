import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = (await cookieStore.get('token'))?.value;

        if (!token) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const payload: any = verifyToken(token);

        if (!payload) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        await connectToDatabase();
        const user = await User.findById(payload.id).select('-password');

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
        console.error('Session error:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
