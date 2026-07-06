import { Schema, model, models } from 'mongoose';

const FormationSchema = new Schema(
    {
        title: { type: String, required: true },
        type: { type: String, enum: ['formation', 'bootcamp'], required: true },
        mode: { type: String },
        startDate: { type: String },
        schedule: { type: String },
        duration: { type: String },
        ageRange: { type: String },
        location: { type: String },
        price: { type: Number },
        originalPrice: { type: Number },
        programme: { type: [String], default: [] },
        image: { type: String },
        imagePublicId: { type: String },
        programmePdfPath: { type: String },
        enrollmentLink: { type: String },
        href: { type: String, default: '/programmes' },
    },
    { timestamps: true }
);

const Formation = models.Formation || model('Formation', FormationSchema);
export default Formation;
