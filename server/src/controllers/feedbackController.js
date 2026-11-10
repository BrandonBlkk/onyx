import Feedback from '../models/feedbackModel.js'

const createFeedback = async (req, res) => {
    const rating = Number(req.body?.rating)
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : ''
    const attachmentUrl = req.body?.attachment_url ?? null

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Please choose a rating from 1 to 5.' })
    }

    if (!message || message.length > 2000) {
        return res.status(400).json({ message: 'Please enter feedback up to 2000 characters.' })
    }

    if (attachmentUrl !== null) {
        const screenshotMatch = typeof attachmentUrl === 'string'
            ? attachmentUrl.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/i)
            : null

        if (!screenshotMatch || Buffer.from(screenshotMatch[2], 'base64').length > 5 * 1024 * 1024) {
            return res.status(400).json({ message: 'Please attach a PNG, JPG, or WebP image up to 5 MB.' })
        }
    }

    try {
        await Feedback.create({ rating, message, attachment_url: attachmentUrl })
        return res.status(201).json({ message: 'Feedback submitted successfully.' })
    } catch {
        return res.status(500).json({ message: 'Unable to submit feedback right now.' })
    }
}

export default { createFeedback }
