import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import Formation from '@/models/Formation';
import { isAdmin } from '@/lib/adminAuth';
import { replaceStoredImage, deleteStoredImage } from '@/lib/imageService';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const data = await req.json();
        await connectToDatabase();

        const oldFormation = await Formation.findById(id);

        if (oldFormation) {
            await replaceStoredImage(
                oldFormation.image,
                oldFormation.imagePublicId,
                data.image,
                data.imagePublicId
            );
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
            await deleteStoredImage(formation.image, formation.imagePublicId);
            await Formation.findByIdAndDelete(id);
        }

        return NextResponse.json({ message: 'Deleted' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
