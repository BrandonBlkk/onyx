import jwt from 'jsonwebtoken'

const getCookieValue = (cookieHeader, name) => {
    const cookie = cookieHeader
        ?.split(';')
        .map((item) => item.trim())
        .find((item) => item.startsWith(`${name}=`))

    return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : null
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    const bearerToken = authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null
    const token = bearerToken || getCookieValue(req.headers.cookie, 'onyx_remember_token')

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        req.authToken = token
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' })
    }
}

// Session checks need to distinguish an anonymous visitor from a rejected
// protected request. This middleware attaches a valid user when available,
// but lets the request continue when the visitor has no valid session.
export const optionalAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    const bearerToken = authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null
    const token = bearerToken || getCookieValue(req.headers.cookie, 'onyx_remember_token')

    if (!token) {
        return next()
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        req.authToken = token
    } catch {
        // An expired session is treated as signed out for the session check.
    }

    next()
}

export default authMiddleware
