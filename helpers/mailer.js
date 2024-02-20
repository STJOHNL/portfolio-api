import sgMail from '@sendgrid/mail'
import asyncHandler from 'express-async-handler'

const sendPasswordReset = asyncHandler(async (user, link) => {
    const msg = {
        to: user.email,
        from: {
            email: process.env.FROM_EMAIL,
            name: 'Lace Up - Point 2 Running Company'
        },
        templateId: 'd-787158f0b4454799bc2831cdedabd15b',
        dynamicTemplateData: {
            name: user.fName,
            link
        }
    }
    await sgMail.send(msg)
})

export {
    sendPasswordReset
}