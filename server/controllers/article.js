const Article = require('../models/article')

class articleController{

    static findArticles(req,res,next){
        Article.find()
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
    static findOne(req,res,next){
        Article.find()
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
        let {title, content} = req.body
        Article.create({
            title,
            content
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
        let updatedData = {}
        req.body.title && (updatedData.title = req.body.title)
        req.body.content && (updatedData.description = req.body.content)
        Article.findByIdAndUpdate(req.params.id,updatedData,{new: true, runValidators:true})
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



}

module.exports = articleController;