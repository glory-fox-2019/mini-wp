const Article = require('../models/article')
class ArticleController {
    static create(req, res, next) {
        console.log(req.decode)
        const { title, content, image } = req.body
        let obj = {
            title,
            content,
            image,
            userId: req.decode._id
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

    static userArticle(req, res, next) {
        Article.find({ userId: req.decode._id })
            .sort({ updatedAt: -1 })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static creatorArticle(req, res, next) {
        Article.find({ userId: req.headers.creatorid })
        .then(articles => {
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
        Article.deleteOne({ _id: req.params.articleId })
            .then(article => {
                res.status(200).json('Article has been deleted')
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static update(req, res, next) {
        let dataUpdate = {}
        const { title, content } = req.body
        if(title) dataUpdate.title = title
        if(content) dataUpdate.content = content
        Article.update({ _id: req.params.articleId }, dataUpdate)
        .then(data => {
            res.status(200).json({ message: 'data has been updated successfully'})
        })
        .catch(err => {
            console.log(err)
        })
    }
}
module.exports = ArticleController