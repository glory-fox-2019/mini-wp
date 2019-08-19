const { article , User } = require('../model')
const { ObjectId } = require('mongodb')
class artilce_controller{

    static list(req,res,next){
        article.find({}).populate('author')
        .populate('User')
        .then(data=>{
            console.log(data)
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static add(req,res,next){
        // res.send('dsfjdsifds')
        let { title , content } = req.body
        console.log(req.body)
        console.log(req.decode.data._id , ' di controller article add / post') 
        article.create({
            title ,  content , author : ObjectId(req.decode.data._id)
        })
        .then(data=>{
            console.log(data , ' beeifjfeifejfiejfe')
            res.json(data)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static findOne(req,res,next){
        let {id} = req.params
        article.findById(id)
        .then(dataArticle=>{
            res.json(dataArticle)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static updateArticle(req,res,next){
        let { title , content  } = req.body
        article.updateOne({
            _id : req.params.id
        },{
            title , content
        })
        .then(dataArticle=>{
            res.status(201).json(dataArticle)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static currentArticle(req,res,next){
        article.find({
            author :  ObjectId(req.decode.data._id) 
        })
        .then(data=>{
            console.log(data , ' i0u-9')
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static Delete(req,res,next){
        article.deleteOne({
            _id : req.params.id
        })
        .then(data=>{
            console.log(data , ' i0u-9')
            res.json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = artilce_controller