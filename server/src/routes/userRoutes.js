import express from 'express'
import authController from '../controllers/authController.js'
import userController from '../controllers/userController.js'

const router = express.Router();

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getSingleUser)
router.post('/', authController.createUser)
router.post('/login', authController.loginUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router