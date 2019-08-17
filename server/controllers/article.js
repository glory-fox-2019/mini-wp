const Article = require('../models/article')

class articleController{

    static findArticles(req,res,next){
        let {name} = req.decode
        Article.find()
        .then(data => {
            res.status(200).json({
                name,
                data,
                message: 'data found'
            })
        }).catch(err => {
            res.status(404)
            next(err)
        })

    }
    static findOne(req,res,next){
        let {id} = req.body
        Article.findById(id)
        .then(data => {
            res.status(200).json({
                data,
                message: 'data found'
            })
        }).catch(err => {
            res.status(404)
            next(err)
        })
    }
    static create(req,res,next){
        let {id, name} = req.decode
        let featured_image = req.file.cloudStoragePublicUrl
        let {title, content} = req.body
        Article.create({
            title,
            content,
            featured_image,
            UserId: id,
            author: name
        }).then(data => {
            res.status(201).json({
                data,
                message: 'data created'
            })
        }).catch(err => {
            res.status(500)
            next(err)
        })
    }
    static update(req,res,next){
        let {id} = req.params
        let updatedData = {}
        req.body.title && (updatedData.title = req.body.title)
        req.body.content && (updatedData.content = req.body.content)
        req.body.featured_image && (updatedData.featured_image= req.body.featured_image)
        Article.findByIdAndUpdate(
            id,
            updatedData,
            {new: true, runValidators:true}
        ).then(data => {
            res.status(200).json({
                data,
                message: 'data updated'
            })
        }).catch(err => {
            res.status(500)
            next(err)
        })
    }
    static delete(req,res,next){
        let {id} = req.params
        Article.findByIdAndDelete(id)
        .then(data => {
            res.status(200).json({
                data,
                message: 'Data is deleted'
            })
        }).catch(err => {
            res.status(500)
            next(err)
        })
    }
    static findMine(req,res,next){
        let {id} = req.decode
        Article.find({UserId: id})
        .then(data => {
            res.status(200).json({
                data
            })
        }).catch(err => {
            res.status(404)
            next(err)
        })
    }




}

module.exports = articleController;