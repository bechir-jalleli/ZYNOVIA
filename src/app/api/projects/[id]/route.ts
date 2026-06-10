import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import StudentProject from '@/models/Project';
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

        const oldProject = await StudentProject.findById(id);

        if (oldProject) {
            await replaceStoredImage(
                oldProject.coverImg,
                oldProject.coverImgPublicId,
                data.coverImg,
                data.coverImgPublicId
            );

            await replaceStoredImage(
                oldProject.creator?.picture,
                oldProject.creator?.picturePublicId,
                data.creator?.picture,
                data.creator?.picturePublicId
            );
        }

        const updated = await StudentProject.findByIdAndUpdate(id, data, { returnDocument: 'after' });
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

        const project = await StudentProject.findById(id);
        if (project) {
            await deleteStoredImage(project.coverImg, project.coverImgPublicId);
            await deleteStoredImage(project.creator?.picture, project.creator?.picturePublicId);
            await StudentProject.findByIdAndDelete(id);
        }

        return NextResponse.json({ message: 'Deleted' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
