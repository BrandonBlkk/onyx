import User from '../models/userModel.js'
import Preference from '../models/preferenceModel.js'
import { validateUpdatePreferences, validateUpdateUser } from '../validators/userValidator.js'
import { Resend } from 'resend'
import accountDeletionEmail from '../emails/accountDeletionEmail.js'
import dotenv from 'dotenv'
dotenv.config()

const formatUser = (user) => ({
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
})

const formatPreferences = (preferences) => ({
    theme: preferences.theme,
    language: preferences.language,
    pageSize: preferences.page_size === 'us_letter' ? 'letter' : preferences.page_size,
    autoSave: preferences.auto_save,
    writingTips: preferences.show_tips,
})

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({
            token: req.authToken,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSingleUser = async (req, res) => {
    res.send('get single user')
}

const updateUser = async (req, res) => {
    try {
        if (String(req.user.id) !== String(req.params.id)) {
            return res.status(403).json({ message: 'You can only update your own profile' })
        }

        const { value: updateFields, error } = validateUpdateUser(req.body)

        if (error) {
            return res.status(400).json({ message: error })
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        ).select('-password')

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json(
            {
                message: 'Profile updated successfully',
                user: formatUser(updatedUser),
            }
        )
    } catch (error) {
        if (error.name === 'ValidationError') {
            const firstError = Object.values(error.errors)[0]
            return res.status(400).json({ message: firstError.message })
        }

        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user id' })
        }

        res.status(500).json({ message: error.message })
    }
}

const getPreferences = async (req, res) => {
    try {
        const userPreferences = await Preference.findOneAndUpdate(
            { user: req.user.id },
            { $setOnInsert: { user: req.user.id } },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        )

        res.status(200).json({ preferences: formatPreferences(userPreferences) })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user id' })
        }

        res.status(500).json({ message: error.message })
    }
}

const updatePreferences = async (req, res) => {
    try {
        const { value: updateFields, error } = validateUpdatePreferences(req.body)

        if (error) {
            return res.status(400).json({ message: error })
        }

        const updatedPreferences = await Preference.findOneAndUpdate(
            { user: req.user.id },
            {
                $set: updateFields,
                $setOnInsert: { user: req.user.id },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        )

        res.status(200).json({
            message: 'Preferences updated successfully',
            preferences: formatPreferences(updatedPreferences),
        })

    } catch (error) {
        if (error.name === 'ValidationError') {
            const firstError = Object.values(error.errors)[0]
            return res.status(400).json({ message: firstError.message })
        }

        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid preference value' })
        }

        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        if (String(req.user.id) !== String(req.params.id)) {
            return res.status(403).json({ message: 'You can only delete your own account' })
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id)

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({ message: 'Account deleted successfully' })

        const user = deletedUser;

        const resend = new Resend(process.env.RESEND_API_KEY);
        const accountDeletionEmailContent = await accountDeletionEmail({ fullname: user.fullname });

        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Onyx <onboarding@resend.dev>',
            to: user.email,
            subject: 'Account deletion confirmation',
            ...accountDeletionEmailContent
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user id' })
        }

        res.status(500).json({ message: error.message })
    }
}

export default {
    getAllUsers,
    getMe,
    getSingleUser,
    updateUser,
    getPreferences,
    updatePreferences,
    deleteUser
}
