import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto';
import Preference from '../models/preferenceModel.js'
import validateCreateUser from '../validators/createUserValidator.js'
import { validateForgetPassword, validateLoginUser } from '../validators/authValidator.js'
import passwordResetEmail from '../emails/passwordResetEmail.js'
import { Resend } from "resend";
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}

const formatUser = (user) => ({
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
})

const createUser = async (req, res) => {
    try {
        const { value, error } = validateCreateUser(req.body)

        if (error) {
            return res.status(400).json({
                message: error,
            })
        }

        const {
            fullname: normalizedFullname,
            email: normalizedEmail,
            password,
        } = value

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
            fullname: normalizedFullname,
            email: normalizedEmail,
            password: hashedPassword,
        })

        if (!user) {
            return res.status(500).json({ message: 'Failed to create user' })
        } else {
            const pereferences = await Preference.create({
                user: user._id
            })

            if (!pereferences) {
                return res.status(500).json({ message: 'Failed to create preferences' })
            }

            await pereferences.save()
            
            const token = generateToken(user)
            res.status(201).json({ token, user: formatUser(user) })
        }
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
        const { value, error } = validateLoginUser(req.body);

        if (error) {
            return res.status(400).json({
                message: error,
            })
        }

        const { email: normalizedEmail, password } = value;

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({ message: 'No user found with this email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user)
        res.status(200).json({
            message: "Welcome to Onyx",
            token,
            user: formatUser(user)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { value, error } = validateForgetPassword(req.body);

        if (error) {
            return res.status(400).json({
                message: error,
            })
        }

        const { email: normalizedEmail } = value;

        const user = await User.findOne({ email: normalizedEmail });
        
        if (!user) {
            return res.status(401).json({ message: 'No user found with this email' });
        }

        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

        user.passwordResetToken = hashedToken;
        user.passwordResetTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save({ validateBeforeSave: false });

        const resend = new Resend(process.env.RESEND_API_KEY);
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;
        const email = await passwordResetEmail({ resetLink, fullname: user.fullname });

        const { error: resendError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Onyx <onboarding@resend.dev>',
            to: user.email,
            subject: 'Password reset link',
            ...email,
        })

        if (resendError) {
            // Rollback token if email failed to send
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save({ validateBeforeSave: false });

            throw new Error(resendError.message)
        }
        
        res.status(200).json({
            message: "Password reset link sent to your email",
            user: formatUser(user)
        }); 
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default { createUser, loginUser, forgetPassword }
