import Contact from '../models/Contact.js'
import asyncHandler from 'express-async-handler'

export default {
    // // @desc Get all Contacts
    // // @route GET /contact
    // // @access Private
    // getContacts: asyncHandler(async (req, res) => {
    //     const contacts = await Contact.find()

    //     return res.json(contacts)
    // }),

    // @desc Create a Contact
    // @route POST /contact
    // @access Private
    createContact: asyncHandler(async (req, res) => {
        const {
            email,
            fName,
            lName,
            message
        } = req.body

        const contact = await Contact.create({
            email,
            fName,
            lName,
            message
        })

        return res.json(contact)
    }),

    // // @desc Update a Contact
    // // @route PUT /contact
    // // @access Private
    // updateContact: asyncHandler(async (req, res) => {
    //     const {
    //         id,
    //         company,
    //         contactFName,
    //         contactLName,
    //         phone,
    //         email
    //     } = req.body

    //     const contact = await Contact.findByIdAndUpdate(id, {
    //         company,
    //         contactFName,
    //         contactLName,
    //         phone,
    //         email
    //     }, { new: true })

    //     return res.json(contact)
    // }),

    // // @desc Get a Contact by id
    // // @route GET /contact/:id
    // // @access Private
    // getContact: asyncHandler(async (req, res) => {
    //     const { id } = req.params

    //     const contact = await Contact.findById(id)

    //     return res.json(contact)
    // }),

    // // @desc Delete Contact by id
    // // @route DELETE /contact/:id
    // // @access Private
    // deleteContact: asyncHandler(async (req, res) => {
    //     const { id } = req.params

    //     const contact = await Contact.findByIdAndDelete(id)

    //     return res.json(contact)
    // })
}