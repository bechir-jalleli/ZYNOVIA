import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    coverImg: { type: String, required: true },
    coverImgPublicId: { type: String },
    creator: {
        firstName: { type: String },
        lastName: { type: String },
        picture: { type: String },
        picturePublicId: { type: String },
        school: { type: String }
    }
}, { timestamps: true });

const StudentProject = models.StudentProject || model('StudentProject', ProjectSchema, 'projects');
export default StudentProject;
