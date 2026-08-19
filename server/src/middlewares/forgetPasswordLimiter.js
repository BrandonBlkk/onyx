import { rateLimit } from 'express-rate-limit'

const forgetPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        message: 'Too many password reset attempts. Please try again in 15 minutes.',
    },
})

export default forgetPasswordLimiter
