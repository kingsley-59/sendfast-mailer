

function serverErrorHandler(err, req, res) {
    console.log('Error: ', err.message);
    res.status(500).json({status: 500, message: err.message});
}

module.exports = serverErrorHandler