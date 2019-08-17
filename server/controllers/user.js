const Model = require('../models');
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt');

class User {
  static login(req,res,next){
    Model.User
      .findOne({
        username: req.body.username
      })
      .then(data => {
        if(!data) next({httpStatus: 404, message: 'Username/Password is wrong'})
        else{
          if(bcrypt.comparePassword(req.body.password,data.password)){
            let payload = {
              id: data._id,
              name: data.name,
              username: data.username,
              email: data.email,
              role: data.role,
              isLogin: true,
            }
            let token = jwt.generateToken(payload);
            res.json({token, payload});
          }else{
            next({httpStatus: 401, message: 'Wrong Password'})
          }
        }
      })
      .catch(next)
    
  }
  static register(req,res,next){
    Model.User
      .create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: 'admin'
      })
      .then(data => {
        let payload = {
          id: data._id,
          name: data.name,
          username: data.username,
          email: data.email,
          role: data.role,
          isLogin: true,
        }
        let token = jwt.generateToken(payload);
        res.json({token, payload});
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
          res.json(data);
        }else{
          next({httpStatus: 403, message: 'Forbidden'})
        }
      })
      .catch(next)
  }
}

module.exports = User;