const Article = require('../models/article')
const User = require('../models/user')
class ArticleController {
    static create(req, res, next) {
        const newArticle = {
            title: req.body.title,
            content: req.body.content,
            author: req.decoded._id,
            featured_image: req.file.cloudStoragePublicUrl
        }
        
        let newArtikel = {}
        Article.create(newArticle)
            .then(data => {
                newArtikel = data
                return User.findByIdAndUpdate(req.decoded._id, {
                    $push: {
                        articles: data._id
                    }   
                })
            })
            .then(() => {
                res.status(201).json(newArtikel)                
            })
            .catch(next)
    }

    static read(req, res, next) {
        Article.find({
            author: req.decoded._id
        }).populate('author', "_id name email")
            .then(data => {
                res.json(data.sort((a,b) => b.updatedAt - a.updatedAt))
            })
            .catch(next)
    }

    static patchUpdate(req, res, next) {
        const {_id} = req.params
        const {title, content} = req.body
        Article.findByIdAndUpdate({_id}, { $set : {title, content} }, { new: true })
            .then((art) => {
                res.json(art)
            })
            .catch(next)
    }

    static putUpdate(req, res, next) {
        const {_id} = req.params
        const artikel = {
            title: req.body.title,
            content: req.body.content,
            featured_image: req.file.cloudStoragePublicUrl
        }
        Article.findByIdAndUpdate({_id}, { $set : artikel }, { new: true })
        .then((art) => {
            res.json(art)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        const {_id} = req.params;
        Article.deleteOne({_id})
            .then(() => {
                return User.findByIdAndUpdate(req.decoded._id, {
                    $pull: {
                        articles: req.params._id
                    }
                })
            })
            .then(()=>{
                res.status(204).json({})
            })
            .catch(next)
    }
}

module.exports = ArticleController