import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    email: String,
    fName: String,
    lName: String,
    message: String,
}, { timestamps: true })

const Contact = mongoose.model('Contact', contactSchema)

export default Contact