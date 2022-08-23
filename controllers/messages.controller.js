const prisma = require('../config/prisma')


async function getUserMessages(req, res, next) {
    try {
        let messages = await prisma.messages.findMany({
            where: {usersId: req.user?.id}
        })
        res.status(200).send({status: 'success', data: messages})
    } catch (error) {
        console.log('Error: ', error.message);
        next(error)
        res.status(500).json({status: 500, message: error.message});
    }
}

async function addUserMessage() {

}

async function updateUserMessage() {

}

async function deleteUserMessage() {

}

module.exports = {
    getUserMessages,
    addUserMessage,
    updateUserMessage,
    deleteUserMessage
}