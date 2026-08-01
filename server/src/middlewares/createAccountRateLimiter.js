import { rateLimit } from 'express-rate-limit'

const createAccountRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipFailedRequests: true,
    message: {
        message: 'Too many account creation attempts. Please try again in an hour.',
    },
})

export default createAccountRateLimiter
