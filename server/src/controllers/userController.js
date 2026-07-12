import User from '../models/userModel.js'
import Preference from '../models/preferenceModel.js'

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
        const { fullname } = req.body
        const updateFields = {}

        if (String(req.user.id) !== String(req.params.id)) {
            return res.status(403).json({ message: 'You can only update your own profile' })
        }

        if (fullname !== undefined) {
            const trimmedFullname = fullname.trim()

            if (!trimmedFullname) {
                return res.status(400).json({ message: 'Fullname is required' })
            }

            updateFields.fullname = trimmedFullname
        }

        if (!Object.keys(updateFields).length) {
            return res.status(400).json({ message: 'No profile changes provided' })
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
        const preferences = req.body

        if (!preferences || typeof preferences !== 'object' || Array.isArray(preferences)) {
            return res.status(400).json({ message: 'Preferences are required' })
        }

        const updateFields = {}

        if (preferences.theme !== undefined) {
            updateFields.theme = preferences.theme
        }

        if (preferences.language !== undefined) {
            updateFields.language = preferences.language
        }

        const pageSize = preferences.pageSize ?? preferences.page_size
        if (pageSize !== undefined) {
            updateFields.page_size = pageSize === 'letter' ? 'us_letter' : pageSize
        }

        const autoSave = preferences.autoSave ?? preferences.auto_save
        if (autoSave !== undefined) {
            updateFields.auto_save = autoSave
        }

        const writingTips = preferences.writingTips ?? preferences.showTips ?? preferences.show_tips
        if (writingTips !== undefined) {
            updateFields.show_tips = writingTips
        }

        if (!Object.keys(updateFields).length) {
            return res.status(400).json({ message: 'No preference changes provided' })
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
