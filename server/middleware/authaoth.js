const jwt = require('../helpers/bcrypt')
const User = require('../models/user')
const Article = require('../models/article')

function authentication(req,res,next){
    console.log('masuk authentification')
    if(req.headers.hasOwnProperty('token')){
        let decode = jwt.verifyJWT(req.headers.token)
        req.decode = decode
        User.findOne({ email:req.decode.email})
        .then(user=>{
            if(user){
                next()
            }else{
                res.status(404).json('Not Found')
            }
        })
        .catch(next)
    }else{
        res.status(401).json('Please provide token!')
    }
}

function authorization(req,res,next){
    console.log('masuk authorization')
    Article.findById(req.params.id)
        .then(article=>{
            if(article){
                if(article.userId == req.decode._id){
                    next()
                }else{
                    res.status(401).json({message : 'Unauthorized user'})
                }
            }else{
                res.status(404).json({message: 'article is not found'})
            }
        })
        .catch(err=>{
            next(err)
        })
}

module.exports = {
    authentication,
    authorization
}