const article = require('../models/article')

class ArticleController {
    static create(req, res, next) {
        let { id } = req.decode
        let { title, content } = req.body
        article.create({ title, content, userId: id })
        .then(article => {
            res.status(201).json(article)
        })
        .catch(next)
    }

    static find(req, res, next) {
        let { id } = req.decode
        article.find({userId: id})
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static update(req, res, next) {
        let { id } = req.params
        let updatedData = {}
        req.body.title && (updatedData.title = req.body.title)
        req.body.content && (updatedData.content = req.body.content)
        article.findByIdAndUpdate(id, updatedData, {new: true, runValidators:true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        article.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = ArticleController