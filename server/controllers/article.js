const Article = require('../models/article')
const { deleteFromGCS } = require('../middlewares/google-cloud-storage')

class ArticleController {
    static create(req, res, next) {
        let { title, content, tags } = req.body
        let image_path = req.file.gcsUrl
        let author = req.decoded._id


        Article.create({ title, content, image_path, author, tagsId: tags })
        .then( data => {
            if (req.file && req.file.gcsUrl) {
                res.status(201).json(data)
            } else {
                next({ code: 500, message: 'Unable to upload'})
            }
        })
        .catch(next)
    }
    
    static findAll(req, res, next) {
        let filter = {}
        
        req.query.title && (filter.title = req.query.title)
        req.query.tags && (filter.tags = req.query.tags)

        Article.find(filter).populate([{ path: 'tagsId' }, { path: 'author'}]).sort({ createdAt: -1 })
            .then( data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findUserArticles(req, res, next){
        let author = req.decoded._id
        Article.find({ author }).populate([{ path: 'tagsId' }, { path: 'author'}]).sort({ createdAt: -1 })
            .then( data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        let id = req.params.articleId
        Article.findById(id)
            .then( data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static deleteOne(req, res, next) {
        let id = req.params.articleId
        Article.findByIdAndDelete(id)
            .then( data => {
                let filename = data.image_path.replace('https://storage.googleapis.com/portfolio-hacktiv8-miniwp-assets/','')
                deleteFromGCS(filename)
                res.status(200).json(data)
            })
            .catch(next)
    }

    static updateOne(req, res, next) {
        let update = {}
        const id = req.params.articleId

        if(req.file){
            let image_path = req.file.gcsUrl
            image_path && (update.image_path = image_path)
        }

        req.body.title && (update.title = req.body.title)
        req.body.content && (update.content = req.body.content)
        req.body.tags && (update.tagsId = req.body.tags)
        

        Article.findByIdAndUpdate(id, update, { new: true, runValidators: true})
            .then( data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
}

module.exports = ArticleController