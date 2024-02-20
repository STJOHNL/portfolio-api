import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req, res, next) => {
    let token
    token = req.cookies.token

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.userId).select('-password')

            next()
        } catch (error) {
            res.status(401)
            console.log(error)
            return res.json({ message: 'You must log in first.' })
        }
    } else {
        res.status(401)
        return res.json({ message: 'You must log in first.' })
    }
}

export { protect }