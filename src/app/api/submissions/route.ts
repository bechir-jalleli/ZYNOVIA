import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import FormSubmission from '@/models/FormSubmission';
import { isAdmin } from '@/lib/adminAuth';

export async function GET(req: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');

        if (type !== 'contact' && type !== 'rendez-vous') {
            return NextResponse.json({ message: 'Type invalide' }, { status: 400 });
        }

        await connectToDatabase();
        const submissions = await FormSubmission.find({ type }).sort({ createdAt: -1 });
        return NextResponse.json(submissions);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
