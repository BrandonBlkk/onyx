import mongoose from 'mongoose';
import Preference from './preferenceModel.js';

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

// Centralized helper to clean up preferences
const deleteUserPreferences = async (userIds) => {
    const ids = Array.isArray(userIds) ? userIds : [userIds];
    const filteredIds = ids.filter(Boolean);

    if (filteredIds.length) {
        await Preference.deleteMany({ user: { $in: filteredIds } });
    }
};

userSchema.post('findOneAndDelete', async function (user) {
    if (user) {
        await deleteUserPreferences(user._id);
    }
});

userSchema.pre('deleteMany', async function () {
    const usersToDelete = await this.model.find(this.getQuery()).select('_id');
    this._cascadeDeletedUserIds = usersToDelete.map((user) => user._id);
});

userSchema.post('deleteMany', async function () {
    if (this._cascadeDeletedUserIds?.length) {
        await deleteUserPreferences(this._cascadeDeletedUserIds);
    }
});

const User = mongoose.model('User', userSchema);
export default User;
