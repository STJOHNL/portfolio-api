import { generateToken, generateResetToken } from '../utils/generateToken.js'
import User from '../models/User.js'
import { sendPasswordReset } from '../helpers/mailer.js'
import asyncHandler from 'express-async-handler'

export default {
    // @desc Log user in
    // @route POST /login
    // @access Public
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' })
        }

        if (user && (await user.matchPassword(password))) {
            const userObj = user.toObject()
            delete userObj.password
            const token = generateToken(res, userObj)

            return res.status(201).json({ token })
        }
        return res.status(404).json({ message: 'Invalid credentials' })
    }),
    // @desc Register user
    // @route POST /register
    // @access Public
    register: asyncHandler(async (req, res) => {
        let { fName, lName, email, password } = req.body
        email = email.toLowerCase()

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400).json({ message: 'User with that email already exists' })
            return
        }

        const user = await User.create({
            fName,
            lName,
            email,
            password
        })

        if (user) {
            const userObj = user.toObject()
            delete userObj.password
            const token = generateToken(res, userObj)
            res.status(201).json({ token })
        } else {
            res.status(400).json({ error: error.message })
        }
    }),
    // @desc Logout user
    // @route POST /logout
    // @access Public
    logout: asyncHandler(async (req, res) => {
        const cookies = req.cookies
        if (!cookies?.token) return res.sendStatus(204) // No content
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })

        res.json({ message: 'User logged out' })
    }),
    // @desc Send forgot password email
    // @route POST /forgot-password
    // @access Public
    forgotPassword: asyncHandler(async (req, res) => {
        let { email } = req.body
        email = email.toLowerCase()
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: 'User with that email does not exist' })
        }

        const resetToken = generateResetToken()
        user.resetToken = resetToken
        user.resetExpires = Date.now() + 3600000 // 1 hour
        await user.save()

        // let link = `https://laceup-client.onrender.com/reset-password/${resetToken}`
        let link = `http://localhost:5173/reset-password/${resetToken}`

        sendPasswordReset(user, link)
        res.json({ message: 'Email has been sent!' })
    }),
    // @desc Reset users password
    // @route POST /reset-password
    // @access Public
    resetPassword: asyncHandler(async (req, res) => {
        const { token, password } = req.body

        const user = await User.findOne({
            resetToken: token,
            resetExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' })
        }

        user.password = password
        user.resetToken = undefined
        user.resetExpires = undefined

        await user.save()
        res.json({ message: 'Password updated!' })
    })
}