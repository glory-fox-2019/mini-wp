const User       = require('../models/user')
const Article    = require('../models/article')
const { decode } = require('../helpers')

module.exports = {
    authentication: function (req, res, next) {
        try {
            const token = req.headers.accesstoken
            const decoded  = decode(req.headers.accesstoken)
            req.authenticatedUser = decoded
            User.findById(decoded._id)
            .then(user => {
                if (user) {
                    next()
                }
                else {
                    next({
                        code : 401,
                        message : "User not found"
                    })
                }
            })
            .catch(next)
        }
        catch (err) {
            next({
                code: 401,
                message: `Please login to continue`
            })
        }
    },

    authorization: function (req, res, next) {
        Article.findById(req.params.id)
        .then(article => {
            if (article) {
                if (String(article.owner) !== req.authenticatedUser._id) {
                    next({
                        code: 403,
                        message: `Forbidden`
                    })
                }
                else {
                    next()
                }
            }
            else {
                next({
                    code: 404,
                    message: `Article not found`
                })
            }
        })
        .catch(next)
    }
}
