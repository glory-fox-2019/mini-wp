const { User } = require('../models');
const JWT = require('../helper/jwt');
const Bcrypt = require('../helper/bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID)

class ControllerUser {
    static list(req, res) {
        User
            .find()
            .then(user => {
                if (user) res.status(200).json(user)
                else res.status(400).json('user not found')
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static register(req, res) {
    
        const { name, email, password } = req.body

        User
            .create({
                name, email, password
            })
            .then(user => {
                // console.log(user, '<--------------------');
                res.status(201).json(user)
            })
            .catch(err => {
                // console.log(err,'<==========');
                res.status(500).json(err)
            })
    }
    static googleSignin(req, res) {

        let googlePayload

        User
            .verifyIdToken({ // syncronus
                idToken: req.body.id_token,
                audience: process.env.CLIENT_ID
            })
            .then(ticket => {

                googlePayload = ticket.getPayload()

                return User
                    .findOne({
                        email: googlePayload.email
                    })
            })
            .then(user => {
                if (!user) {
                    return User
                        .create({
                            name: googlePayload.email,
                            email: googlePayload.name.replace(/\s/g, ''),
                            password: process.env.PASSWORD
                        })
                }
                return user
            })
            .then(data => {
                let payload = JWT.generateJwt({
                    id: data._id,
                    name: data.name,
                    email: data.email
                })
                let encrypt = {
                    payload,
                    id: user._id
                }
                res.status(200).json(encrypt)
            })
            .catch(err => {
                res.status(500).json(err + '<----------------')
            })
    }
    static login(req, res) {
        const { email, password } = req.body

        User
            .findOne({ email })
            .then(user => {
                // console.log(user);
                if (user) {
                    // console.log('2');
                    if (Bcrypt.comparePass(password, user.password)) {
                        // console.log('3');
                        let token = JWT.generateJwt({
                            email: user.email,
                            name: user.name,
                            id: user._id
                        })
                        // console.log('4', token);
                        let finalToken = {
                            token,
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }
                        // console.log(finalToken);
                        res.status(200).json(finalToken)
                    }
                    else {
                        res.status(400).json({ error: 'email / password wrong' })
                    }

                } else {
                    res.status(400).json({ error: 'email / password wrong' })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ControllerUser