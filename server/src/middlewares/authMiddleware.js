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

export default authMiddleware
