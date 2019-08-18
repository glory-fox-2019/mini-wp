const User = require('../models/user')
const { verifyPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


class UserController {
    static register(req, res, next) {
        const { fullname, email, password } = req.body
        User.findOne({email})
        .then(data => {
            if (data){
                res.status(400).json({message : "Email Already Used"})
            }else {
                return User.create({ fullname, email, password })
            }
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
            .then(data => {
                if (data) {
                    if (verifyPassword(password, data.password)) {

                        let token = createToken(data)
                        res.status(200).json({ token })
                    } else {
                        res.status(404).json('message : Email/password not found')
                    }
                } else {
                    res.status(404).json('message : Email not found')
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json('error')
            })
    }

    static loginFromOauth(req, res) {
        const { token } = req.body;
        client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                const payload = ticket.payload
                return User.findOne({
                        email: payload.email
                    })
                    .then(data => {
                        if (data) {
                            return data
                        } else {
                            return User.create({
                                email: payload.email,
                                fullname : payload.given_name + " " + payload.family_name,
                                password: "uzumymw"
                            })
                        }
                    })
                    .then(data => {
                        let token = createToken(data)
                        res.status(200).json({ token })
                    })
            })
            .catch(err => {
                res.status(500)({ message: 'Internal Server Error' })
            })
    }

    static profile(req,res,next){
        let input = {};
        req.decode.id && (input.id = req.decode.id)
        req.params.id && (input.id = req.params.id)
        User.findById(input.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

}

module.exports = UserController