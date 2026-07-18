import express from 'express'
import userRoutes from './routes/userRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'

const app = express()

app.use(express.json())
app.use('/onyx/api/users', userRoutes)
app.use('/onyx/api/resumes', resumeRoutes)

export default app;
