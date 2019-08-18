const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {hashPass, compareHash} = require('../helpers/passHash')

class UserController {
    static login(req, res, next) {
        const {email, password} = req.body
        User.findOne({email: email.toLowerCase()})
            .then(user => {
                if(user) {
                    if(compareHash(password, user.password)) {
                        const {_id, name, email} = user
                        const token = jwt.sign({_id, name, email}, process.env.JWT_SECRET )
                        
                        res.status(200).json({_id, name, token})
                    } else {
                        next({status: 400, message: "Wrong email / password"})
                    }
                } else {
                    next({status: 400, message: "Wrong email / password"})
                }
            })
    }

    static register(req, res, next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: hashPass(req.body.password)
        }
        User.create(newUser)
            .then(user => {
                const {_id, name, email} = user
                const token = jwt.sign({_id, name, email}, process.env.JWT_SECRET )
                        
                res.status(201).json({name, token})
            })
            .catch(next)
    }

    static googleSignIn(req, res, next) {
        let user = {}
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                user.name = ticket.getPayload().name
                user.email = ticket.getPayload().email
                // const tokenToClient = jwt.sign({email}, process.env.JWT_SECRET)
                return User.findOne({ email: user.email.toLowerCase() })

            })
            .then( foundUser => {
                if(!foundUser) {
                    const hash = hashPass(process.env.GOOGLE_PASSWORD);

                    return User.create({
                        name: user.name,
                        email: user.email,
                        password: hash
                    })
                } else {
                    return foundUser
                }
            })
            .then(createdUser=> {
                const {_id, name, email} = createdUser
                const token = jwt.sign({_id, name, email}, process.env.JWT_SECRET)
                res.json({name, token})
            })
            .catch(next)

    }
}

module.exports = UserController