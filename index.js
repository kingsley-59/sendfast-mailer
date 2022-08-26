const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')

const serverErrorHandler = require('./middleware/ServerErrorHandler')

const authRoutes = require('./routes/auth.routes')
const contactsRoutes = require('./routes/contacts.routes')
const mailserverRoutes = require('./routes/mailserver.routes')
const messageRoutes = require('./routes/messages.routes')
const testmailRoute = require('./routes/testmail.routes')

dotenv.config()
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4001
const app = express()

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// router-level middlewares
app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactsRoutes)
app.use('/api/serverinfo', mailserverRoutes)
app.use('/api/messages', messageRoutes)

app.use('/sendtestmail', testmailRoute)

// error-handling middlewares
app.use(serverErrorHandler)

app.listen(PORT, () => {
    console.log('listening at port ', PORT)
})