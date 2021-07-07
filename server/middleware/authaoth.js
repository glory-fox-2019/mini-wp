const jwt = require('../helpers/bcrypt')
const User = require('../models/user')
const Article = require('../models/article')

function authentication(req,res,next){
    console.log('authentication processing...')
    try {
        let decode = jwt.verifyJWT(req.headers.token);
        req.decode = decode
        console.log('authentication passed')
        next()
      } catch(err) {
        next(err)
      }
}

function authorization(req,res,next){
    console.log('authorization processing...')
    Article.findById(req.params.articleId)
        .then(article=>{
            if(article){
                if(article.userId == req.decode._id){
                    console.log('authorization passed')
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