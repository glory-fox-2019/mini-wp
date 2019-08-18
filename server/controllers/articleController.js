const Article = require('../models/Article')

class ArticleController {
  static showArticle(req, res, next) {
    Article.find({
      author : req.user.id
    })
    .then(articles => {
      res.json(articles)
    })
    .catch(next)
  }

  static addArticle(req, res, next) {
    const { title, content } = req.body
    Article.create({
      title,
      content,
      author : req.user.id,
      featuredImage : req.file.path
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(next)
  }

  static deleteArticle(req, res, next) {
    Article.deleteOne({
      _id : req.params.articleId
    })
    .then(data => {
      res.json(data)
    })
    .catch(next)
  }

  static updateArticle(req, res, next) {

    
  }
}


module.exports = ArticleController