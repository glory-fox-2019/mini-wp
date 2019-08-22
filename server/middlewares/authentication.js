const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Article = require('../models/articles')
const { verify } = require('../helpers/jwt');

module.exports = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        console.log(token)
        if (!token) {
            // console.log('masuk sini')
            throw {
                Status: 404,
                message: `Token Not Provided`
            }
        } else {
            const decoded = verify(token)
            console.log('DECODED')
            // console.log(decoded);
            User.findOne({
                _id: decoded.id
            })
                .then((found) => {
                    console.log('FOUND')
                    // console.log(found);
                    req.decoded = decoded
                    req.loggedUser = found
                    next()
                })
                .catch((err) => {
                    throw {
                        Status: 404,
                        message: 'User Not Found || Auth Failed'
                    }
                })
        }
    },
    authorization: (req, res, next) => {
        Article.findById(req.params.id)
        .then((found) => {
            console.log(found)
            if (found.userId == req.decoded.id) {
                next()
            } else {
                throw {
                    status: 401,
                    message: `Unauthorized Access || Authorization Failed`
                }
            }
        })
        .catch((err) =>{
            next(err)
        })
    }
}