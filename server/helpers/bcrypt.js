const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = {
    hashPassword(password){
        return bcrypt.hashSync(password, salt)
    },
    comparePassword(password, passwordDB){
        return bcrypt.compareSync(password, passwordDB)
    },
    generateJWT(userPayload){
        return jwt.sign(userPayload, process.env.JWT_SECRET, {expiresIn: '1d'})
    },
    verifyJWT(token){
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}