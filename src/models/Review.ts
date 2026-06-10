import { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema({
    name: { type: String, required: true },
    imgSrc: { type: String, required: true },
    imgSrcPublicId: { type: String },
    rating: { type: Number, required: true, default: 5 },
    desc: { type: String, required: true },
}, { timestamps: true });

const Review = models.Review || model('Review', ReviewSchema);
export default Review;
