import User from '../models/userModel.js'

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
    res.send('update user')
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
