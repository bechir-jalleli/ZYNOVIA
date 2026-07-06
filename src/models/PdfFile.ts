import { Schema, model, models } from 'mongoose';

export type PdfFileStatus = 'pending' | 'ready' | 'error';

export interface IPdfFile {
    _id: string;
    originalName: string;
    sizeBytes: number;
    pageCount: number;
    totalParts: number;
    status: PdfFileStatus;
    errorMessage?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PdfFileSchema = new Schema<IPdfFile>(
    {
        originalName: { type: String, required: true, trim: true },
        sizeBytes: { type: Number, required: true, min: 0 },
        pageCount: { type: Number, required: true, min: 0 },
        totalParts: { type: Number, default: 0, min: 0 },
        status: {
            type: String,
            enum: ['pending', 'ready', 'error'] as PdfFileStatus[],
            default: 'pending',
        },
        errorMessage: { type: String, default: null },
    },
    { timestamps: true }
);

// Fast lookup by status
PdfFileSchema.index({ status: 1, createdAt: -1 });

const PdfFile = models.PdfFile || model<IPdfFile>('PdfFile', PdfFileSchema);
export default PdfFile;
