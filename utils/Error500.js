

function Error500(errMsg) {
    return {
        status: 'error',
        message: errMsg ?? 'Internal Server Error'
    }
}

module.exports = Error500