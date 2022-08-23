const bcrypt = require('bcrypt')
const prisma = require('../config/prisma')

async function getMailServerInfo(req, res, next) {
    console.log(req.user?.id)
    try {
        let mailserver = await prisma.MailServer.findMany({
            where: {
                usersId: req.user?.id
            }
        })
        res.status(200).send({status: 'success', data: mailserver})
        return;
    } catch (error) {
        next()
    }
}

async function addMailServerInfo(req, res, next) {
    const {host, port, user, pass} = req.body ?? {}
    // validate contact details
    if (!host || !user || !pass) {
        res.status(400).send({status: 'error', message: 'incomplete credentials'})
        return;
    }

    // save mailserver details
    try {
        let salt = await bcrypt.genSalt(10)
        let passHash = await bcrypt.hash(pass, salt)
        let mailserver = await prisma.MailServer.create({
            data: { 
                host, port, user, passHash,
                usersId: req.user?.id, created_at: new Date() 
            }
        })
        console.log(mailserver)
        if (!mailserver) {
            res.status(500).send({status: 'error', message: 'Unable to save server info'})
            return;
        }

        res.status(200).send({status: 'success', message: 'Server info saved successfully!'})
    } catch (error) {
        next(error)
    }
}

async function updateMailServerInfo() {

}

async function deleteMailServerInfo() {

}


module.exports = {
    getMailServerInfo,
    addMailServerInfo,
    updateMailServerInfo,
    deleteMailServerInfo,
}