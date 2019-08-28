const User = require('../models/user')
const { decrypt, sign, passwordGenerator, client, CLIENT_ID } = require('../helpers')

class AuthController {
    static register(req, res, next) {
        User.create(req.body)
            .then(newUser => {
                res.status(201).json(newUser)
            })
            .catch(err => {
                console.log(err)
                if (err.message == 'Email has been taken') {
                    next({
                        code: 400,
                        message: err.message
                    })
                }
                else if (RegExp('validation').test(err.message)) {
                    next({
                        code: 403,
                        message: err.message
                    })
                }
                else {
                    next(err)
                }
            })
    }

    static login(req, res, next) {
        User.findOne({
            email: req.body.email
        })
        .then(foundUser => {
            if (!foundUser) {
                next({
                    code: 404,
                    message: `User not found`
                })
            }
            else {
                if (decrypt(req.body.password, foundUser.password)) {
                    const token = sign(foundUser._id, foundUser.name);
                    res.status(200).json({
                        accesstoken: token
                    })
                }
                else {
                    next({
                        code: 401,
                        message: `Wrong password`
                    })
                }
            }
        })
        .catch(next)
    }

    static verify(req, res, next) {
        let payload
        let token
        client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID,
        })
        .then(ticket => {
            payload = ticket.getPayload()
            const userid = payload['sub']
            return User.findOne({
                email: payload.email
            })
        })
        .then(user => {
            if (!user) {
                return User.create({
                    name: payload.name,
                    email: payload.email,
                    password: passwordGenerator()
                })
            }
            else {
                return user
            }
        })
        .then(newUser => {
            req.body.name = newUser.name
            next()
            token = sign(newUser._id, newUser.name)
            res.status(200).json({
                accesstoken: token
            })
        })
        .catch(next)
    }
}

module.exports = AuthController