const express = require('express')
const dotenv = require('dotenv')
const http = require('http')
const authRoutes = require('./routes/auth.routes')
const path = require('path')

dotenv.config()
const PORT = process.env.PORT || 4001
const app = express()

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use('/auth', authRoutes)




app.listen(PORT, () => {
    console.log('listening at port ', PORT)
})