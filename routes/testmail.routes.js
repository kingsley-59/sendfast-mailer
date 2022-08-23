const express = require('express')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
require('dotenv').config()

const router = express.Router()
const smtpConfig = smtpTransport({
    host: 'mail.vendorcrest.com',
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_USER
    }
})

const transporter = nodemailer.createTransport(smtpConfig)

let mailOptions = {
    from: 'Vendorcrest Digital <info@vendorcrest.com>',
    sender: 'divine10646@gmail.com',
    to: 'kingsleyakahibe@gmail.com',
    replyTo: 'divine10646@gmail.com',
    subject: 'Here is the subject',
    html: '<h2>This is a another test email message.<h2/>',
}

router.get('/sendmail', async function(req, res) {
    console.log('sendmail request processing...')
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Info: ', info)
        res.send('Email sent!')
    } catch (error) {
        console.log('Error', error)
        res.send('An error occurred!')
    }
})

module.exports = router