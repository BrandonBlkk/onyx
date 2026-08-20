import express from 'express'
import authController from '../controllers/authController.js'
import userController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import loginRateLimiter from '../middlewares/loginRateLimiter.js'
import createAccountRateLimiter from '../middlewares/createAccountRateLimiter.js'
import forgetPasswordLimiter from '../middlewares/forgetPasswordLimiter.js'

const router = express.Router();

router.get('/me', authMiddleware, userController.getMe)
router.get('/', userController.getAllUsers)
router.get('/preferences', authMiddleware, userController.getPreferences)
router.get('/:id', userController.getSingleUser)
router.post('/', createAccountRateLimiter, authController.createUser)
router.post('/login', loginRateLimiter, authController.loginUser)
router.post('/forget-password', forgetPasswordLimiter, authController.forgetPassword)
router.post('/reset-password/:token', forgetPasswordLimiter, authController.resetPassword)
router.put('/preferences', authMiddleware, userController.updatePreferences)
router.put('/:id', authMiddleware, userController.updateUser)
router.delete('/:id', authMiddleware, userController.deleteUser)

export default router
