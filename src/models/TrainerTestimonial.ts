import { Schema, model, models } from 'mongoose';

const TrainerTestimonialSchema = new Schema({
    quote: { type: String, required: true },
    student: { type: String, required: true },
    focus: { type: String, required: true },
}, { timestamps: true });

const TrainerTestimonial = models.TrainerTestimonial || model('TrainerTestimonial', TrainerTestimonialSchema);
export default TrainerTestimonial;
