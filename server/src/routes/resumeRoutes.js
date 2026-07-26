import express from 'express'
import {
    createResume,
    deleteResume,
    getAllResumes,
    getResumeDetails,
    searchResumes,
    toggleFavorite,
    updateResume,
} from '../controllers/resumeController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/', authMiddleware, createResume)
router.post('/:id/favorite', authMiddleware, toggleFavorite)
router.get('/', authMiddleware, getAllResumes)
router.get('/:id', authMiddleware, getResumeDetails)
router.get('/search/:query', authMiddleware, searchResumes)
router.put('/:id', authMiddleware, updateResume)
router.delete('/:id', authMiddleware, deleteResume)

export default router
