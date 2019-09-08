const Model = require('../models');
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class User {
  static login(req,res,next){
    Model.User
      .findOne({
        email: req.body.email,
        loginWith: 'normal',
      })
      .then(data => {
        if(!data) next({httpStatus: 403, message: 'Email/Password is wrong'})
        else{
          if(bcrypt.comparePassword(req.body.password,data.password)){
            let payload = {
              id: data._id,
              name: data.name,
              username: data.username,
              email: data.email,
              role: data.role,
              loginWith: data.loginWith,
            }
            let token = jwt.generateToken(payload);
            res.json({token, payload});
          }else{
            next({httpStatus: 403, message: 'Email/Password is wrong'})
          }
        }
      })
      .catch(next)
    
  }
  static register(req,res,next){
    console.log(req.body)
    Model.User
      .create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: 'author',
        loginWith: 'normal',
      })
      .then(data => {
        let payload = {
          id: data._id,
          name: data.name,
          username: data.username,
          email: data.email,
          role: data.role,
          loginWith: data.loginWith,
        }
        let token = jwt.generateToken(payload);
        res.status(201).json({token, payload});
      })
      .catch(next)
  }
  static getUser(req,res,next){
    Model.User
      .findOne({
        _id: req.decode.id
      })
      .then(data => {
        if(data){
          let payload = {
            id: data._id,
            name: data.name,
            username: data.username,
            email: data.email,
            role: data.role,
            loginWith: data.loginWith,
          }
          res.json(payload);
        }else{
          next({httpStatus: 403, message: 'Forbidden'})
        }
      })
      .catch(next)
  }
  static loginWithGoogle(req,res,next){
    let googlePayload;
    client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((ticket) => {
        googlePayload = ticket.getPayload();
        return Model.User
          .findOne({
            email: googlePayload.email,
          })
      })
      .then(data => {
        if(data) {
          if(data.loginWith === 'google'){
            return data;
          }else if(data.loginWith === 'normal'){
            next({httpStatus: 401, message: 'This email already in used'})
          }
        }else{ // create accoutn
          //find username already exist?
          let username = googlePayload.email.match(/[^@]+/)[0];
          return Model.User
            .findOne({
              username: username,
            })
            .then(data => {
              if(data){
                username += "_" + Date.now();
              }
              return Model.User
                .create({
                  name: googlePayload.name,
                  username: username,
                  password: 'f4804q08hq24h80309uwr',
                  email: googlePayload.email,
                  role: 'author',
                  loginWith: 'google',
                })
            })
        }
      })
      .then(data => {
        let payload = {
          id: data._id,
          name: data.name,
          username: data.username,
          email: data.email,
          role: data.role,
          loginWith: data.loginWith,
        }
        console.log(payload);
        let token = jwt.generateToken(payload);
        res.json({token, payload});
      })
      .catch(next);

  }
}

module.exports = User;