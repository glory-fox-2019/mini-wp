// const dotenv = require('dotenv').config()
// if (process.env.NODE_ENV == 'development') {
//     require('dotenv').config()
// }
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { compareHash } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class ControllerUser {
    static register(req, res, next) {
        // console.log('masuk siniiiiii')
        // const { fullName, email, password, username } = req.body
        User.create(req.body)
            // console.log(process.env.JWT_SECRET)
        .then((result) => {
            // console.log('whyyyyyyyyyyyyyyyyyyyyybdshjf')
            let token = jwt.sign({
                name: result.fullName,
                email: result.email
            }, process.env.JWT_SECRET)
            res.status(201).json(token)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
    }

  
    static findOne(req, res, next) {
        User.findOne({
            email: req.params.email
        })
        .then((user) => {
            res.status(200).json({ user })
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
    }

    static login(req, res, next) {
        User.findOne({ email: req.body.email })
        .then((found) => {
            // console.log(found)
            if (found === null) {
                res.status(404).json({
                    message: "Invalid Username or Password"
                })
            }
            else {
                if (compareHash(req.body.password, found.password)) {
                    let token = jwt.sign({
                        id: found._id,
                        name: found.fullname,
                        username: found.username,
                        email: found.email
                    }, process.env.JWT_SECRET)
                    console.log(token, 'masukkkkkkk')
                    res.status(200).json({token})
                    
                } else {
                    res.status(404).json({
                        message: "Invalid Username or Password"
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
    }

    static googleSignIn(req, res, next) {
        console.log('masuk google sign in')
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then((result) => {
            console.log('masuk siniiii')
            const { name, email, picture } = result.getPayload();
            const payload = { name, email, picture }
            return Promise.all([
                payload,
                User.findOne({
                    email: payload.email
                })
            ])
        })
        .then((found) => {
            if (found[1] === null) {
                res.status(404).json(null)
            } else {
                console.log(found[0]);
                let token = jwt.sign({
                    id: found[1]._id,
                    name: found[1].fullname,
                    username: found[1].username,
                    email: found[0].email,
                    picture: found[0].picture
                }, process.env.JWT_SECRET)
                res.status(200).json(token)
            }
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = ControllerUser