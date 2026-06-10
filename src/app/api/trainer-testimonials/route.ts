import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import TrainerTestimonial from '@/models/TrainerTestimonial';
import { isAdmin } from '@/lib/adminAuth';

export async function GET() {
    try {
        await connectToDatabase();
        const testimonials = await TrainerTestimonial.find().sort({ createdAt: -1 });
        return NextResponse.json(testimonials);
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
        const testimonial = await TrainerTestimonial.create(data);
        return NextResponse.json(testimonial, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
