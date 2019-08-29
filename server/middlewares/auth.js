const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const Article = require('../models/article')

module.exports = {
    authenticate(req,res,next){
        if(req.headers.token){
            try {
                var decoded = jwt.verify(req.headers.token, secret);
                req.decoded = decoded
                next()
              } catch(err) {
                throw ({
                    code: 401,
                    message: "Please provide a valid token"
                })
              }
        }else{
            throw ({
                code: 401,
                message: "Please log in first"
            })
        }
    },
    authorization(req, res, next){
        Article.findById(req.params.id)
            .then(article => {
                if (!article) {
                    res.status(404).json('Not found')
                } else {
                    if (req.decoded._id == article.author) {
                        next()
                    } else {
                        res.status(403).json('Not Authorized')
                    }
                }
            })
        .catch(next)
    }
}