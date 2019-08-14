module.exports = (req, res, next) => {
    const Article = require('../models/article')
    const id = req.decode.id
    const articleId = req.body._id
    Article.findById({id: articleId})
    .then(data => {
        if(data.UserId == id){
            next()
        }
    }).catch(next)
}