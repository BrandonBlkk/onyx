import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto';
import Preference from '../models/preferenceModel.js'
import validateCreateUser from '../validators/createUserValidator.js'
import { validateForgetPassword, validateLoginUser, validateResetPassword } from '../validators/authValidator.js'
import passwordResetEmail from '../emails/passwordResetEmail.js'
import { Resend } from "resend";
import dotenv from 'dotenv';
import welcomeEmail from '../emails/welcomeEmail.js';
dotenv.config();

const generateToken = (user, expiresIn = '7d') => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn }
    )
}

const rememberMeCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000,
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

            const resend = new Resend(process.env.RESEND_API_KEY);
            const welcomeEmailContent = await welcomeEmail({ fullname: user.fullname });

            await resend.emails.send({
                from: process.env.RESEND_FROM_EMAIL || 'Onyx <onboarding@resend.dev>',
                to: user.email,
                subject: 'Welcome to Onyx',
                ...welcomeEmailContent
            });
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

        const { email: normalizedEmail, password, rememberMe } = value;

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({ message: 'No user found with this email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user, rememberMe ? '30d' : '7d')

        if (rememberMe) {
            res.cookie('onyx_remember_token', token, rememberMeCookieOptions)
        } else {
            res.clearCookie('onyx_remember_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
            })
        }

        res.status(200).json({
            message: "Welcome to Onyx",
            token,
            user: formatUser(user)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('onyx_remember_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    })

    res.status(200).json({ message: 'Logged out successfully' })
}

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
        const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
        const resetLink = `${clientUrl}/auth/reset-password/${rawToken}`;
        const email = await passwordResetEmail({ resetLink, fullname: user.fullname });

        const { error: resendError } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Onyx <onboarding@resend.dev>',
            to: user.email,
            subject: 'Password reset link',
            ...email,
        })

        if (resendError) {
            // Rollback token if email failed to send
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpiresAt = undefined;
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

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { value, error } = validateResetPassword(req.body);

        if (error) {
            return res.status(400).json({ message: error });
        }

        if (!/^[a-f0-9]{64}$/i.test(token || '')) {
            return res.status(400).json({ message: 'This password reset link is invalid or has expired' });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetTokenExpiresAt: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ message: 'This password reset link is invalid or has expired' });
        }

        user.password = await bcrypt.hash(value.password, 10);
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiresAt = undefined;
        await user.save();

        return res.status(200).json({ message: 'Your password has been reset. You can now sign in.' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default { createUser, loginUser, logoutUser, forgetPassword, resetPassword }
