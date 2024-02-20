import express from 'express'
const router = express.Router()
// import upload from '../middleware/multer.js'
import authController from '../controllers/auth.js'
import { protect } from '../middleware/auth.js'

router.route('/login')
    .post(authController.login)

router.route('/register')
    .post(authController.register)

router.route('/logout')
    .post(authController.logout)

router.route('/forgot-password')
    .post(authController.forgotPassword)

router.route('/reset-password')
    .post(authController.resetPassword)


export default router