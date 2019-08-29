module.exports = (req, res, next) => {
    const Article = require('../models/article')
    const { id } = req.decode
    const articleId = req.params.id
    Article.findById(articleId)
    .then(data => {
        console.log(data)
        if(data.userId == id){
            next()
        }
    }).catch(next)
}