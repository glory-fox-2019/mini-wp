const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = {
    sign : function(payload) {
      return jwt.sign(payload, secret)
    },
    verify : function(token) {
      try {
        const decoded = jwt.verify(token, secret)
        // console.log(decoded)
        if (decoded) {
          return decoded
        }
      } catch(err) {
          console.log(err)
        throw {
          Status : 404,
          message : `Invalid Token || JWT Error`
        }
      }
    }
}