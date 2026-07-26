import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume',
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'favorites',
    }
);

favoriteSchema.index({ user: 1, resume: 1 }, { unique: true });

const Favorites = mongoose.model('Favorite', favoriteSchema);

export default Favorites
