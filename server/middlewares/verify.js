const dotenv  = require('dotenv')
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
        req.decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        console.log('mid')
        next()
    } catch (err) {
        throw {
            message: 'Invalid Token',
            status: 401
        }
    }
}

module.exports = verifyToken