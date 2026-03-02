import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import Formation from '@/models/Formation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

async function isAdmin() {
    const cookieStore = await cookies();
    const token = (await cookieStore.get('token'))?.value;
    if (!token) return false;
    const payload: any = verifyToken(token);
    return payload && payload.role === 'admin';
}

export async function GET() {
    try {
        await connectToDatabase();
        const formations = await Formation.find().sort({ createdAt: -1 });
        return NextResponse.json(formations);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();
        await connectToDatabase();
        const formation = await Formation.create(data);
        return NextResponse.json(formation, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
