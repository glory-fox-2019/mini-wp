module.exports = {

    errorHandler(err, req, res, next) {
        console.log(err, 'from error handler <<<<<<<<')
        if (err.code == 404) {
            res.status(404).json({
                code: 404,
                message: err.message
            })
        } else if (err.code == 401) {
            res.status(401).json({
                code: 401,
                message: err.message
            })
        } else if (err.name == "JsonWebTokenError") {
            res.status(401).json({
                code: 401,
                message: 'Invalid token.'
            })
        } else if (err.name == 'ValidationError') {
            // console.log(err.message,'masuk validation error <<<<<<<<<<')
            let error = err.message.split('failed:').slice(1)[0].split(',')
            let message = ``
            for (let err of error) {
                message += err.split(':')[1] + '\n'
            }
            // console.log(message)
            res.status(500).json({
                code: 500,
                message: message
            })
        } else {
            res.status(500).json({
                code: 500,
                message: err.message
            })
        }
    }
}