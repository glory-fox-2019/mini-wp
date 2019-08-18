const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateJwt(userPayload) {
    return jwt.sign(userPayload, process.env.SECRET_TOKEN, { expiresIn: '1d' })
}

function verifyJwt(token) {
    return jwt.verify(token, process.env.SECRET_TOKEN)
}

module.exports = { generateJwt, verifyJwt }