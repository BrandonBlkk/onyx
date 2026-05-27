import User from '../models/userModel.js'

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
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
    getSingleUser,
    updateUser,
    deleteUser
}
