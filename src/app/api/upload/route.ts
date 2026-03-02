import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define the relative and absolute paths
        const relativePath = `/uploads/formations/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const absolutePath = path.join(process.cwd(), 'public', relativePath);

        // Ensure directory exists
        await mkdir(path.dirname(absolutePath), { recursive: true });

        // Save the file
        await writeFile(absolutePath, buffer);

        return NextResponse.json({ filePath: relativePath });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
