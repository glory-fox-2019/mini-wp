const User = require('../models/User')
const verifyPassword = require('../helpers/verifyPassword')
const jwt = require('jsonwebtoken')

class UserController {
  static register(req, res, next) {

    const { userName, email, password } = req.body

    User.findOne({
      email
    })
    .then(user => {
      if(!user){
        return User.create({
          userName,
          email,
          password
        })
      }else{
        throw {
          status : 400,
          message : ['Email sudah terdaftar']
        }
      }
    })
    .then(data => {
      res.json(data)
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        let errors = []
        for(let key in err.errors) {
          errors.push(err.errors[key].message)
        }
        next({
          status : 400,
          message : errors
        })
      }else{
        next(err)
      }
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      email : email
    })
    .then(user => {
      if(user) {
        if(verifyPassword(password, user.password)){
          
          //Generate Token
          const token = 
          jwt.sign({
            id : user._id,
            email : user.email,
            userName : user.userName
          }, process.env.SECRET_KEY,
          {
            expiresIn : 60 * 60
          })
          res.json({
            token,
            userName : user.userName
          })
          
        }else{
          next({
            status : 403,
            message : ['wrong email/password']
          })
        }
      }else{
        next({
          status : 404,
          message : ['wrong email/password']
        })
      }
    })
    .catch(next)
  }
}

module.exports = UserController