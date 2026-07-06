import { Schema, model, models, Types } from 'mongoose';

export interface IPdfPart {
    _id: string;
    fileId: Types.ObjectId;
    cloudinaryUrl: string;
    cloudinaryPublicId: string;
    startPage: number;  // 1-based, inclusive
    endPage: number;    // 1-based, inclusive
    partIndex: number;  // 0-based ordering index
    sizeBytes: number;
    createdAt: Date;
    updatedAt: Date;
}

const PdfPartSchema = new Schema<IPdfPart>(
    {
        fileId: { type: Schema.Types.ObjectId, ref: 'PdfFile', required: true, index: true },
        cloudinaryUrl: { type: String, required: true },
        cloudinaryPublicId: { type: String, required: true },
        startPage: { type: Number, required: true, min: 1 },
        endPage: { type: Number, required: true, min: 1 },
        partIndex: { type: Number, required: true, min: 0 },
        sizeBytes: { type: Number, required: true, min: 0 },
    },
    { timestamps: true }
);

// Compound index to efficiently retrieve all parts for a file in order
PdfPartSchema.index({ fileId: 1, partIndex: 1 });

const PdfPart = models.PdfPart || model<IPdfPart>('PdfPart', PdfPartSchema);
export default PdfPart;
