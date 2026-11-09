import express from 'express'
import userRoutes from './routes/userRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import feedbackRoutes from './routes/feedbackRoutes.js'

const app = express()

app.use('/onyx/api/v1/feedback', express.json({ limit: '7mb' }), feedbackRoutes)
app.use(express.json())
app.use('/onyx/api/v1/users', userRoutes)
app.use('/onyx/api/v1/resumes', resumeRoutes)

export default app;
