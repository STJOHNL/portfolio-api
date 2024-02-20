import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const generateToken = (res, user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict', // Switch to strict if on same domain
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })

    return token
}

const generateResetToken = () => {
    const token = crypto.randomBytes(20).toString('hex')
    return token
}

export {
    generateToken,
    generateResetToken
}
