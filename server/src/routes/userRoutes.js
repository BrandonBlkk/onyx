import express from 'express'
import authController from '../controllers/authController.js'
import userController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/me', authMiddleware, userController.getMe)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getSingleUser)
router.post('/', authController.createUser)
router.post('/login', authController.loginUser)
router.post('/forget-password', authController.forgetPassword)
router.put('/:id', authMiddleware, userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router
