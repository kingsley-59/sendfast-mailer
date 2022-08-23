const express = require('express')
const JwtAuth = require('../middleware/JwtAuth')
const {
    getUserContacts,
    addUserContact,
    updateUserContact,
    deleteUserContact
} = require('../controllers/contacts.controller')

const router = express.Router()

router.get('/all', JwtAuth, getUserContacts)

router.post('/add', JwtAuth, addUserContact)

router.put('/update', JwtAuth, updateUserContact)

router.delete('/delete', JwtAuth, deleteUserContact)


module.exports = router