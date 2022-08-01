const express = require('express')

const router = express.Router()

router.get('/signup', (req, res) => {
    console.log('signup route called...')
    res.send('Start signup process')
})

router.post('/signup', (req, res) => {
    console.log(req.body)
    
})

router.post('/login', (req, res) => {
    console.log(req.body)
})


module.exports = router