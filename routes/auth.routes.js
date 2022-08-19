const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const prisma = require('../config/prisma')
const dotenv = require('dotenv')
const Error500 = require('../utils/Error500')

const router = express.Router()
dotenv.config()

router.get('/signup', (req, res) => {
    console.log('signup route called...')
    res.send('Start signup process')
})

router.post('/signup', async (req, res) => {

    // validate request credentials
    const {name, email, password} = req.body ?? {}
    if (!name ?? !email ?? !password) {
        res.status(400).send({status: 'error', message: 'fill in all fields'})
        return;
    }

    // check if user exixts
    let userExists = await prisma.users.findUnique({
        where: { email: email}
    })
    if (userExists) {
        console.log(userExists)
        res.status(400).send({status: 'error', message: 'user already exists'})
        return;
    }

    // hash password and save user info
    let user;
    try {
        let salt = await bcrypt.genSalt(10)
        let passwordHash = await bcrypt.hash(password, salt)
        user = await prisma.users.create({
            data: {
                name, email, passwordHash
            }
        })
        console.log(user)
        res.status(200).send({
            status: 'success', 
            message: 'user registered sucessfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(Error500())
    }
    
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body ?? {}

    // validate user credentials
    if (!email || !password) {
        res.status(400).send({status: 'error', message: 'fill in all fields'})
        return;
    }

    let user;
    try {
        user = await prisma.users.findUnique({
            where: {email: email}
        })
        if (!user) {
            res.status(401).send({status: 'error', message: 'user does not exist'})
            return;
        }
        let validPassword = await bcrypt.compare(password, user.passwordHash)
        if (!validPassword) {
            res.status(400).send({status: 'error', message: 'invalid password'})
            return;
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({status: 'error', message: 'internal server error'})
        return;
    }

    let accessToken;
    let refreshToken;
    try {
        accessToken = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, {expiresIn: "1d"})
        refreshToken = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, {expiresIn: "1w"})

        res.status(200).send({status: 'success', data: {user, accessToken}})
    } catch (error) {
        console.log(error)
        res.status(500).send(Error500())
        return ;
    }
})


module.exports = router