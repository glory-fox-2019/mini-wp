const User = require('../models/user')
const { generateJWT } = require('../helpers/bcrypt')
const { comparePassword } = require('../helpers/bcrypt')

class userController {

    static register(req, res, next) {
        console.log('masuk regis');
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio
        })

        newUser.save()
            .then(user => {
                console.log(user)
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                // console.log(user)
                if (user) {
                    if (comparePassword(req.body.password, user.password)) {
                        console.log('password cocok')
                        let payload = {
                            id: user._id,
                            email: user.email,
                            username: user.username,
                            bio: user.bio
                        }

                        let token = generateJWT(payload)
                        // console.log(token)
                        res.status(200).json({
                            token,
                            userId: user._id,
                            username: user.username,
                            bio: user.bio
                        })
                    } else {
                        throw {
                            code: 404,
                            message: 'Wrong Email/Password'
                        }
                    }
                } else {
                    throw {
                        code: 404,
                        message: 'Wrong Email/Password'
                    }
                }
            })
            .catch(next)
    }

    static update(req, res, next){
        User.updateOne({
            _id: req.decode.id
        },{
            bio: req.body.bio,
            profilePic: req.file.cloudStoragePublicUrl
        })
        .then(response => {
            res.status(200).json({meesage: 'success'})
        })
        .catch(next)
    }

    static findOne(req, res, next){
        console.log(req.decode)
        User.findOne({
            _id: req.dec
        })
    }
}

module.exports = userController