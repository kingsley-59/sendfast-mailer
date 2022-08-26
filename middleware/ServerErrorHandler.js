

// eslint-disable-next-line no-unused-vars
function serverErrorHandler(err, req, res, next) {
    console.log('Error: ', err.message);
    res.status(500).json({status: 500, message: err.message});
}

module.exports = serverErrorHandler