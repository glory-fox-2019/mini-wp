const jwt = require('../helper/jwt')
const Article = require('../models/Article')
function authentication(req,res,next){
    try {
        let decoded = jwt.verifyToken(req.headers.token);
        req.decoded = decoded
        next()
      } catch(err) {
        next(err)
      }
}

function authorization(req,res,next){
    Article.findById(req.params.id)
        .then(article=>{
            if(article){
                if(article.user == req.decoded._id){
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