const express = require('express')
const dotenv = require('dotenv')
const JwtAuth = require('../middleware/JwtAuth')
const {
    getMailServerInfo,
    addMailServerInfo,
    deleteMailServerInfo,
    updateMailServerInfo
} = require('../controllers/mailserver.controller')

const router = express.Router()
dotenv.config()


router.get('/all', JwtAuth, getMailServerInfo)

router.post('/add', JwtAuth, addMailServerInfo)

router.put('/update', JwtAuth, updateMailServerInfo)

router.delete('/delete', JwtAuth, deleteMailServerInfo)


module.exports = router