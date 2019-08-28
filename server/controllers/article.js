const Article = require('../models/article')

class ArticleController {
    static articleList(req, res, next) {
        let field = {}
        if (req.query.title) {
            field.title = {
                $regex: req.query.title,
                $options: 'i'
            }
        }
        else if (req.query.tags) {
            field.tags = {
                $in: req.query.tags
            }
        }
        
        Article.find(field)
            .sort({ created_at: -1 })
            .populate('owner')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static oneArticle(req, res, next) {
        Article.findOne({
                _id: req.params.id
            })
            .populate('owner')
            .then(article => {
                if (article) {
                    res.status(200).json(article)
                }
                else {
                    next({
                        code: 404,
                        message: `Article not found`
                    })
                }
            })
            .catch(next)
    }

    static addArticle(req, res, next) {
        if (req.body.tags.length > 1) {
            req.body.tags = req.body.tags.split(',').map(tag => tag.replace(/ /g,''))
        }
        const obj = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            tag: req.body.tag,
            owner: req.authenticatedUser._id,
        }
        if(req.file) {
            obj.featured_image = req.file.cloudStoragePublicUrl
        }
        Article.create(obj)
        .then(newArticle => {
            res.status(201).json(newArticle)
        })
        .catch(next)
    }

    static deleteArticle(req, res, next) {
        Article.deleteOne({
                _id: req.params.id,
            })
            .then(result => {
                if (result.n && result.ok) {
                    res.status(200).json({
                        message: `Article deleted`
                    })
                }
                else {
                    next({
                        code: 404,
                        message: `Article not found`
                    })
                }
            })
            .catch(next)
    }

    static updateArticle(req, res, next) {
        if (req.body.tags.length > 1) {
            req.body.tags = req.body.tags.split(',').map(tag => tag.replace(/ /g,''))
        }
        if (req.file) {
            let featured_image = req.file.cloudStoragePublicUrl
            req.body.featured_image = featured_image
        } 
        Article.updateOne({
                _id: req.params.id
            }, {
                $set: req.body
            })
            .then(result => {
                if (result.n && result.ok) {
                    res.status(200).json({
                        message: 'Article updated'
                    })
                }
                else {
                    next({
                        code: 404,
                        message: `Article not found`
                    })
                }
            })
            .catch(next)
    }
}

module.exports = ArticleController