const Article = require('../models/article')

class ArticleController {
    static create (req, res, next) {
        const { title, content } = req.body
        const author = req.decode._id;
        const featured_image = req.body.image
        Article.create({
            title,
            content,
            featured_image,
            author
        })
        .then(created => {
            res.status(201).json(created)
        })
        .catch(next)
    }

    static destroy (req, res, next) {
        const id = req.params.id
        Article.findByIdAndDelete(id)
        .then(results => {
            let image_name = results.featured_image.split('/')
            image_name = image_name[image_name.length - 1]
            req.file = image_name
            next()
        })
        .catch(next)
    }

    static findAll(req, res, next) {
        Article.find().populate('author','username').sort({
            createdAt: -1
        })
        .then(results => {
            res.status(200).json(results)
        })
        .catch(next)
    }

    static update(req, res, next) {
        const { title, content } = req.body
        const author = req.decode._id;
        const featured_image = req.body.image
        Article.findByIdAndUpdate(req.params.id,{
            title,
            content,
            featured_image,
            author
        })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(next)
    }
}

module.exports = ArticleController