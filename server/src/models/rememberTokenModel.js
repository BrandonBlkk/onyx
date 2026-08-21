import mongoose from "mongoose";

const rememberTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'remember_tokens',
    }
);

const RememberToken = mongoose.model('RememberToken', rememberTokenSchema);
export default RememberToken