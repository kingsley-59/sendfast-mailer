const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const authRoutes = require('./routes/auth.routes')
const path = require('path')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

dotenv.config()
const PORT = process.env.PORT || 4001
const app = express()

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const smtpConfig = smtpTransport({
    host: 'mail.vendorcrest.com',
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    port: 587,
    auth: {
        user: '_mainaccount@vendorcrest.com',
        pass: '@0N0q1vyDwAW2+'
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

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use((req, res, next) => {
    console.log(req?.body ?? {})

    if (req.method === 'POST') {
        // check if request body is empty
        if (!req.body) {
            res.status(422).json({
                status: 'error', 
                message: 'unprocessable entity'
            })
            return ;
        }
    }

    next()
})

app.use('/auth', authRoutes)

app.get('/sendmail', async function(req, res) {
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


app.listen(PORT, () => {
    console.log('listening at port ', PORT)
})