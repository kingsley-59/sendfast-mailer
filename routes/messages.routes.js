const express = require('express')
const dotenv = require('dotenv')
const JwtAuth = require('../middleware/JwtAuth')
const {
    getUserMessages,
    addUserMessage,
    updateUserMessage,
    deleteUserMessage
} = require('../controllers/messages.controller')

const router = express.Router()
dotenv.config()


router.get('/all', JwtAuth, getUserMessages)

router.post('/add', JwtAuth, addUserMessage)

router.put('/update', JwtAuth, updateUserMessage)

router.delete('/delete', JwtAuth, deleteUserMessage)

module.exports = router