const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ACCESS_TOKEN);
const User = require('../models/user');
const { hash, compare } = require('../helpers/bcrypt');
const generatetoken = require('../helpers/generate-token');

class UserController {

  static signin(req, res, next){
    const { email, password } = req.body
    User.findOne({
      email
    })
    .then(found => {
      if(found){
        if(compare(password, found.password) == false) throw new Error('wrong email/password')
        else {
          const isuser = {
            id: found._id,
            name: found.username,
            email: found.email
          }
          const token = generatetoken(isuser)
          console.log(isuser.id);
          res.json({token, username: isuser.name, id: isuser.id})
        }
      } else throw new Error('wrong email/password')
    })
    .catch(next)
  }

  static signingoogle(req, res, next) {
    let newUser = null
    console.log('masuk');
    client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_ACCESS_TOKEN
      })
      .then(user => {
        newUser = user.payload
        return User.findOne({
          email: user.payload.email
        })
      })
      .then(found => {
        if (!found) {
          return User.create({
            username: newUser.name,
            email: newUser.email,
            password: hash(process.env.GENERATE_PASSWORD)
          })
        } else {
          const isuser = {
            _id: found._id,
            username: found.username,
            email: found.email
          }
          return isuser
        }
      })
      .then(client => {
        const payload = {
          id: client._id,
          username: client.username,
          email: client.email
        }
        const token = generatetoken(payload)
        res.json({token, username: client.username, id: client._id})
      })
      .catch(next)
  }

  static signup(req, res, next) {

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash(req.body.password)
      })
      .then(newUser => {
        const payload = {
          username: newUser.username,
          email: newUser.email,
          todoList: newUser.todoList
        }
        const token = generatetoken(payload)
        res.status(201).json(token)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController