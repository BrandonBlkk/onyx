import express from 'express'
import {
    createResume,
    deleteResume,
    getAllResumes,
    updateResume,
} from '../controllers/resumeController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/', authMiddleware, createResume)
router.get('/', authMiddleware, getAllResumes)
router.put('/:id', authMiddleware, updateResume)
router.delete('/:id', authMiddleware, deleteResume)

export default router
