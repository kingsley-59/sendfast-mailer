const prisma = require('../config/prisma')


async function getUserMessages(req, res, next) {
    try {
        let messages = await prisma.messages.findMany({
            where: {usersId: req.user?.id},
            select: {
                id: true,
                from: true,
                subject: true,
                to: { select: {email: true}}
            }
        })
        console.log(messages)
        res.status(200).send({status: 'success', data: messages})
    } catch (error) {
        console.log('Error: ', error.message);
        next(error)
        res.status(500).json({status: 500, message: error.message});
    }
}

async function addUserMessage(req, res, next) {
    const { subject, from, to } = req?.body ?? {}

    if (!subject || !from || !to) {
        res.status(400).send({status: 'error', message: 'all fields are required!'})
        return;
    }

    try {
        let message  = await prisma.messages.create({
            data: {
                created_at: new Date(),
                from, subject, to: {
                    connect: to
                }, usersId: req.user.id
            }
        })
        if (!message){
            res.status(500).send({status: 'error', message: 'Unable to save contact'})
            return;
        }
        console.log(message)
        res.status(200).send({status: 'success', message: 'Message saved successfully!'})
    } catch (error) {
        next(error)
    }
}

async function updateUserMessage() {

}

async function deleteUserMessage(req, res, next) {
    const { id } = req.body ?? {}

    if (!id) {
        res.status(400).send({status: 'error', message: 'id is required'})
        return;
    }

    try {
        let message = await prisma.contact.delete({
            where: { id }
        })
        if (!message) {
            res.status(500).send({status: 'error', message: 'Error occurred while deleting contact.'})
            return;
        }
        console.log(message)
        res.status(204).send({status: 'success', message: 'Server info deleted successfully'})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUserMessages,
    addUserMessage,
    updateUserMessage,
    deleteUserMessage
}