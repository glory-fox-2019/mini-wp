const Article = require('../models/Article')

function authorization (req, res, next) {

  let articleId = req.params.articleId
  Article.findOne({
    _id : articleId
  })
  .then(article => {
    if(article.author == req.user.id) {
      next()
    }else{
      next({
        status : 400,
        message : 'Authorization invalid'
      })
    }
  })
  .catch(next)

}


module.exports = authorization