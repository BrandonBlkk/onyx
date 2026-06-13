import User from '../models/userModel.js'

const formatUser = (user) => ({
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
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

const deleteUser = async (req, res) => {
    res.send('delete user')
}

export default {
    getAllUsers,
    getMe,
    getSingleUser,
    updateUser,
    deleteUser
}
