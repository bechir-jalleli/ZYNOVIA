import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import Formation from '@/models/Formation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

async function isAdmin() {
    const cookieStore = await cookies();
    const token = (await cookieStore.get('token'))?.value;
    if (!token) return false;
    const payload: any = verifyToken(token);
    return payload && payload.role === 'admin';
}

async function deleteLocalFile(filePath: string) {
    if (filePath && filePath.startsWith('/uploads/')) {
        try {
            const absolutePath = path.join(process.cwd(), 'public', filePath);
            await unlink(absolutePath);
        } catch (error) {
            console.error('Failed to delete file:', filePath, error);
        }
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const data = await req.json();
        await connectToDatabase();

        // Get old version to check image change
        const oldFormation = await Formation.findById(id);

        if (oldFormation && oldFormation.image !== data.image) {
            await deleteLocalFile(oldFormation.image);
        }

        const updated = await Formation.findByIdAndUpdate(id, data, { returnDocument: 'after' });
        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        await connectToDatabase();

        const formation = await Formation.findById(id);
        if (formation) {
            await deleteLocalFile(formation.image);
            await Formation.findByIdAndDelete(id);
        }

        return NextResponse.json({ message: 'Deleted' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
