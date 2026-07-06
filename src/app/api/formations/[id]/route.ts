import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import Formation from '@/models/Formation';
import { isAdmin } from '@/lib/adminAuth';
import { replaceStoredImage, deleteStoredImage } from '@/lib/imageService';
import { replaceStoredPdf, deletePdfFromCloudinary } from '@/lib/pdfService';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const data = await req.json();
        await connectToDatabase();

        const old = await Formation.findById(id);

        if (old) {
            // Replace image on Cloudinary if changed
            await replaceStoredImage(
                old.image,
                old.imagePublicId,
                data.image,
                data.imagePublicId
            );

            // Delete old PDF from Cloudinary if changed
            await replaceStoredPdf(old.programmePdfPath, data.programmePdfPath);
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
            // Delete image from Cloudinary
            await deleteStoredImage(formation.image, formation.imagePublicId);
            // Delete PDF from Cloudinary
            await deletePdfFromCloudinary(formation.programmePdfPath);
            await Formation.findByIdAndDelete(id);
        }

        return NextResponse.json({ message: 'Deleted' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
