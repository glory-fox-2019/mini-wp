const jwt = require('jsonwebtoken')
const Article = require('../models/article')

function userAuthentication(req, res, next) {
    try {
        const currentUser = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        req.decoded = currentUser
        next()
    } catch (err) {
        next({status: 403, message: "You are not logged in"})
    }
}

function userAuthorization(req, res, next) {
    // console.log(req.params._id)
    Article.findById(req.params._id)
        .then(artikel => {
            if(artikel.author == req.decoded._id) {
                next()
            } else {
                next({status: 401, message: "You are not authorized"})
            }
        })
        .catch(next)
    }

module.exports = {
    userAuthentication,
    userAuthorization
}