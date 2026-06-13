import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light',
        },
        language: {
            type: String,
            enum: ['english', 'burmese'],
            default: 'english',
        },
        page_size: {
            type: String,
            enum: ['a4', 'us_letter'],
            default: 'a4',
        },
        auto_save: {
            type: Boolean,
            default: true,
        },
        show_tips: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: 'preferences',
    }
);

const Preference = mongoose.model('Preference', preferenceSchema);

export default Preference;
