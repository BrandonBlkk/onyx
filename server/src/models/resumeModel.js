import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
        collection: 'resumes',
    }
);

const Resumes = mongoose.model('Resume', resumeSchema);

export default Resumes;
