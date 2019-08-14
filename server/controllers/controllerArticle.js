Article = require('../models/Article')
class ControllerArticle{
    static create(req,res,next){
        const{title,content} = req.body
        Article.create({title,content})
        .then(data=>res.status(201).json(data)
        )
        .catch(err=>{
            next(err)
        }) 
    }

    static findAll(req,res,next){
        Article.find()
        .then(data=> res.json(data))
        .catch(err=>next(err))
    }

    static delete(req,res,next){
        Article.deleteOne({_id:req.params.id})
        .then(()=> res.json({message:"data is deleted"}))
        .catch(err=>next(err))
    }

    static findOne(req,res,next){
        Article.findOne({_id:req.params.id})
        .then((data)=> res.json(data))
        .catch(err=>next(err))
    }

    static update(req,res,next){
        let obj = {}
        const {content,title} = req.body
        if(content) obj.content = content
        if(title) obj.title = title
        Article.update({_id:req.params.id},obj)
        .then((data)=>res.json({message:"data is updated",data}))
        .catch(err=>next(err))
    }



}

module.exports = ControllerArticle