const jwt = require('jsonwebtoken')
function decodeToken(token) {
    console.log(token, "-=========")
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decode, "-------------")
    return decode
}

module.exports = decodeToken