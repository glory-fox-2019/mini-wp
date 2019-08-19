const Article = require('../models/article')
class ArticleController {
    static create(req, res, next) {
        console.log(req.decoded)
        console.log(req.body)
        let obj = {
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date(),
            userId: req.decode.id
        }
        Article.create(obj)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static findAll(req, res, next) {
        Article.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static myArticle(req, res, next) {
        Article.find({ userId: req.decode.id })
            .then(articles => {
                console.log(articles);
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Article.findOne({ _id: req.params.articleId })
            .populate("userId")
            .then(found => {
                res.status(200).json(found)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static delete(req, res, next) {
        Article.deleteOne({ _id: req.params.id })
            .then(article => {
                res.status(200).json('Article has been deleted')
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}
module.exports = ArticleController