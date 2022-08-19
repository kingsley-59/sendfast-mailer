const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const JwtAuth = require('../middleware/JwtAuth')
const Error500 = require('../utils/Error500')

const router = express.Router()
const prisma = new PrismaClient()
dotenv.config()

router.get('/all', JwtAuth, async (req, res) => {
    
    try {
        // let user = await prisma.users.findUnique({
        //     where: { id },
        //     include: {contacts: true}
        // })
        let contacts = await prisma.contact.findMany({
            where: {usersId: req.user?.id}
        })
        res.status(200).send({status: 'success', data: contacts})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({status: 'error', message: 'Internal server error'})
    }
})

router.post('/add', JwtAuth, async (req, res) => {
    const {name, email} = req.body ?? {}
    // validate contact details
    if (!email) {
        res.status(400).send({status: 'error', message: 'email is required'})
        return;
    }

    // save contact details
    try {
        let contact = await prisma.contact.create({
            data: {name, email, usersId: req.user.id,}
        })
        if (!contact) {
            res.status(500).send({status: 'error', message: 'Unable to save contact'})
            return;
        }
        console.log(contact)
        res.status(200).send({status: 'success', message: 'Contact saved successfully!'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send(Error500())
        return ;
    }
    
})

router.delete('/delete', async (req, res) => {
    const { email, password } = req.body ?? {}

    // validate request token
    

    // delete contact details from table
})


module.exports = router