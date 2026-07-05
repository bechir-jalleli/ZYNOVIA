import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/adminAuth';
import { validatePdfFile, savePdfLocally, PdfServiceError } from '@/lib/pdfService';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        // Validate: PDF only, max 20 MB
        validatePdfFile({ type: file.type, size: file.size });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const publicPath = await savePdfLocally(buffer);

        console.log('[PdfUpload] Saved PDF:', publicPath, `(${(file.size / 1024).toFixed(1)} KB)`);

        return NextResponse.json({ path: publicPath });
    } catch (error) {
        if (error instanceof PdfServiceError) {
            const status = error.code === 'INVALID_FORMAT' || error.code === 'FILE_TOO_LARGE' ? 400 : 500;
            return NextResponse.json({ message: error.message, code: error.code }, { status });
        }
        const message = error instanceof Error ? error.message : 'PDF upload failed';
        console.error('[PdfUpload] Unexpected error:', error);
        return NextResponse.json({ message }, { status: 500 });
    }
}
