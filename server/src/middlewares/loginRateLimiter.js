import { rateLimit } from 'express-rate-limit'

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: {
        message: 'Too many sign-in attempts. Please try again in 15 minutes.',
    },
})

export default loginRateLimiter
