import { Schema, model, models } from 'mongoose';

const FormationSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['formation', 'bootcamp'], required: true },
    description: { type: String },
    duration: { type: String },
    level: { type: String },
    image: { type: String },
    imagePublicId: { type: String },
    startDate: { type: String },
    price: { type: Number },
    badge: { type: String },
    features: { type: [String], default: [] },
    href: { type: String, default: '/programmes' },
}, { timestamps: true });

const Formation = models.Formation || model('Formation', FormationSchema);
export default Formation;
