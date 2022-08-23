const prisma = require('../config/prisma')
require('dotenv').config()


async function getUserContacts(req, res, next) {
    try {
        let contacts = await prisma.contact.findMany({
            where: {usersId: req.user?.id}
        })
        res.status(200).send({status: 'success', data: contacts})
    } catch (error) {
        next(error)
    }
}

async function addUserContact(req, res, next) {
    const {name, email} = req.body ?? {}
    // validate contact details
    if (!email) {
        res.status(400).send({status: 'error', message: 'email is required'})
        return;
    }

    // save contact details
    try {
        
        let contact = await prisma.contact.create({
            data: {name, email, created_at: new Date(), usersId: req.user?.id}
        })
        if (!contact) {
            res.status(500).send({status: 'error', message: 'Unable to save contact'})
            return;
        }
        console.log(contact)
        res.status(200).send({status: 'success', message: 'Contact saved successfully!'})
    } catch (error) {
        next(error)
    }
}

async function updateUserContact() {

}

async function deleteUserContact() {
    // const { email, password } = req.body ?? {}

    // validate request token
    

    // delete contact details from table
}

module.exports = {
    getUserContacts,
    addUserContact,
    updateUserContact,
    deleteUserContact
}