import { Schema, model, models } from 'mongoose';

const FormSubmissionSchema = new Schema({
    type: { type: String, enum: ['contact', 'rendez-vous'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    role: { type: String, default: '' },
    message: { type: String, required: true },
    appointmentDate: { type: String, default: '' },
    appointmentTime: { type: String, default: '' },
    appointmentType: { type: String, enum: ['visio', 'onsite', ''], default: '' },
}, { timestamps: true });

const FormSubmission = models.FormSubmission || model('FormSubmission', FormSubmissionSchema);
export default FormSubmission;
