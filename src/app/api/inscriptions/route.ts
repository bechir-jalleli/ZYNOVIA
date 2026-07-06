import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import connectToDatabase from '@/lib/mongodb';
import FormSubmission from '@/models/FormSubmission';
import { isAdmin } from '@/lib/adminAuth';

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectToDatabase();
        // Fetch both inscription form submissions and programme download requests
        const submissions = await FormSubmission.find({
            type: 'contact',
            role: { $in: ['Inscription', 'Téléchargement Programme'] },
        }).sort({ createdAt: -1 });

        return NextResponse.json(submissions);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
