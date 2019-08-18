const Article = require('../models/article')

module.exports = (req, res, next) => {
    let id = req.params.articleId
    
    Article.findById(id)
        .then( data => {
            if(req.decoded._id == data.author){
                next()
            } else {
                next({ code: 401, message: 'You are not authorized!'})
            }
        })
        .catch(next)
}