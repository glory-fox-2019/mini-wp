const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

function createToken(input){
    const {id,email} = input
    return jwt.sign({id,email},secret)
}

function verifyToken(token){
    var a = jwt.verify(token,secret)
    return a
}

module.exports = {createToken, verifyToken}