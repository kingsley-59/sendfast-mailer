const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')
require('dotenv').config()


async function JwtAuth(req, res, next) {
    const { authorization } = req.headers
    const token = authorization.split(' ')
    if (token[0] !== 'Bearer') {
        res.status(400).send({status: 'error', message: 'Invalid authorization header'})
        return;
    }

    try {
        const decode = jwt.verify(token[1], process.env.TOKEN_SECRET)
        const { id } = decode ?? {}
        if (!id) {
            let message = 'Invalid authorization token!'
            res.status(400).send({status: 'error', message})
            return;
        }
        let user = await prisma.users.findUnique({
            where: { id }
        })
        if (!user) {
            res.status(400).send({status: 'error', message: 'user does not exist!'})
            return ;
        }
        req.user = user
        console.log(user)
        next()
    } catch (error) {
        res.status(500).send({status: 'error', message: 'Internal server error'})
        return;
    }
}

module.exports = JwtAuth