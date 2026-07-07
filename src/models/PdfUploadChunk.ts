import { Schema, model, models } from 'mongoose';

export interface IPdfUploadChunk {
    uploadId: string;
    chunkIndex: number;
    totalChunks: number;
    data: Buffer;
    createdAt: Date;
}

const PdfUploadChunkSchema = new Schema<IPdfUploadChunk>({
    uploadId: { type: String, required: true, index: true },
    chunkIndex: { type: Number, required: true },
    totalChunks: { type: Number, required: true },
    data: { type: Buffer, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 } // TTL index: expires in 1 hour
});

// Compound index to guarantee uniqueness and order of chunks per upload
PdfUploadChunkSchema.index({ uploadId: 1, chunkIndex: 1 }, { unique: true });

const PdfUploadChunk = models.PdfUploadChunk || model<IPdfUploadChunk>('PdfUploadChunk', PdfUploadChunkSchema);
export default PdfUploadChunk;
