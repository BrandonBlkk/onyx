import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

const formatUser = (user) => ({
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
})

const createUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: 'Fullname, email, and password are required',
            })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const hashPassword = async (password) => {
            const saltRounds = 10; 
            
            try {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                return hashedPassword;
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        const existingUser = await User.findOne({ email: normalizedEmail })

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' })
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            fullname: fullname.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        })

        res.status(201).json(formatUser(user))
    } catch (error) {
        if (error.name === 'ValidationError') {
            const firstError = Object.values(error.errors)[0]
            return res.status(400).json({ message: firstError.message })
        }

        res.status(500).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email, and password are required',
            })
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: "Login successful",
            user: formatUser(user)
            // JWT token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { createUser, loginUser }