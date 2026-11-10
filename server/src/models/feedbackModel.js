import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: null,
        },
        rating: {
            type: Number,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        attachment_url: {
            type: String,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
        collection: 'feedbacks',
    }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback