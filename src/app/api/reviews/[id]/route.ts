import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';
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

        const oldReview = await Review.findById(id);

        if (oldReview) {
            await replaceStoredImage(
                oldReview.imgSrc,
                oldReview.imgSrcPublicId,
                data.imgSrc,
                data.imgSrcPublicId
            );
        }

        const updated = await Review.findByIdAndUpdate(id, data, { returnDocument: 'after' });
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

        const review = await Review.findById(id);
        if (review) {
            await deleteStoredImage(review.imgSrc, review.imgSrcPublicId);
            await Review.findByIdAndDelete(id);
        }

        return NextResponse.json({ message: 'Deleted' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
