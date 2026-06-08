import { Schema, model, models } from 'mongoose';

const TrainerSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    expertise: { type: [String], required: true, default: [] },
    photo: { type: String, required: true },
    linkedin: { type: String },
}, { timestamps: true });

const Trainer = models.Trainer || model('Trainer', TrainerSchema);
export default Trainer;
