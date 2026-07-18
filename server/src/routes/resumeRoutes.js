import express from 'express'
import {
    createResume,
    deleteResume,
    getAllResumes,
    searchResumes,
    updateResume,
} from '../controllers/resumeController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/', authMiddleware, createResume)
router.get('/', authMiddleware, getAllResumes)
router.get('/search/:query', authMiddleware, searchResumes)
router.put('/:id', authMiddleware, updateResume)
router.delete('/:id', authMiddleware, deleteResume)

export default router
