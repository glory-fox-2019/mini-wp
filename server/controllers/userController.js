const User = require('../models/user')
const { generateJWT, comparePassword } = require('../helpers/bcrypt')

class userController {

    static register(req, res, next) {
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
                if (user) {
                    console.log(user, 'user data')
                    if (comparePassword(req.body.password, user.password)) {
                        console.log('password correct')
                        const { _id, email, username, bio, image } = user
                        const token = generateJWT({ _id, email, username, bio, image })
                        res.status(200).json({
                            token,
                            username,
                            _id
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
        const { bio, image } = req.body
        console.log(req.body, 'data reg body')
        User.updateOne({
            _id: req.decode._id
        },{
            bio,
            image
        },{
            runValidators: true,
        })
        .then(response => {
            res.status(200).json({message: 'update success - controller'})
        })
        .catch(next)
    }

    static dataUser(req, res, next){
        console.log(req.decode,' req decode data')
        User.findOne({
            _id: req.decode._id
        })
        .then(user => {
            const { _id, username, bio, updatedAt, image } = user
            const data = { _id, username, bio, updatedAt, image }
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = userController