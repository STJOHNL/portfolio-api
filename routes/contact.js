import express from 'express'
const router = express.Router()
import contactController from '../controllers/contact.js'

router.route('/')
    .post(contactController.createContact)

export default router