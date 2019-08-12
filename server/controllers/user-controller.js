const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')
const {
    OAuth2Client
} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {

    static register(req, res, next) {
        User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log(req.body)
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    let check = bcrypt.compareSync(req.body.password, user.password)
                    if (check) {
                        let payload = {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                        let token = jwt.signToken(payload)
                        res.status(200).json(token)
                    } else {
                        throw new Error('Wrong email/ password.')
                    }
                } else {
                    throw new Error('Wrong email/ password.')
                }
            })
            .catch(next)
    }

    static loginGoogle(req, res, next) {
        // console.log('masuk google sign in <<<<<<<<<<<<<<<<<<')
        client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                let payload = ticket.getPayload()
                console.log(payload)
                return Promise.all([payload, User.findOne({
                    email: payload.email
                })])
            })
            .then(([payload, user]) => {
                if (user) {
                    return Promise.all([payload, user])
                } else {
                    return Promise.all([payload, User.create({
                        username: payload.name,
                        email: payload.email,
                        password: 'tes'
                    })])
                }
            })
            .then(([payload, user]) => {
                // console.log(user)
                payload.id = user._id
                let token = jwt.signToken(payload)
                res.status(200).json(token)
            })
            .catch(next)
    }

}

module.exports = UserController