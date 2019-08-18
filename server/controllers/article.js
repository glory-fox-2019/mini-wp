const Article = require('../models/article')
const {deleteBucket} = require('../middlewares/image')


class ArticleController {
    static home(req,res,next){
        Article.find({status : 1}).populate('author')
        .sort({views : -1})
        .limit(20)
        .then(data => {
            res.status(200).json(data)
        })  
        .catch(next)
    }

    static createArticle(req,res,next){
        let data = req.body;
        let author = req.decode.id
        if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl;
        }
       const title = req.body.title;
       const content = req.body.content;
       const status = req.body.status
       const imageUrl = req.body.imageUrl;
       const views = 1
       Article.create({title,content,status,imageUrl,views,author})
       .then(data => {
           res.status(201).json(data)
       })
       .catch(next)
    }

    static updateArticle(req,res,next){
       const {id} = req.params
       if (req.file && req.file.cloudStoragePublicUrl) {
        req.body.imageUrl = req.file.cloudStoragePublicUrl;
        }
       let input = {};
       req.body.title && (input.title = req.body.title)
       req.body.content && (input.content = req.body.content)
       req.body.created_at && (input.created_at = req.body.created_at)
       req.body.status && (input.status = req.body.status)
       req.body.imageUrl && (input.imageUrl = req.body.imageUrl)
       Article.findByIdAndUpdate(id,input,{new: true}).populate('author')
       .then(data => {
           res.status(200).json(data)
       })
       .catch(next)
    }   

    static getMyArticle(req,res,next){
        const author = req.decode.id
        const {status} = req.params
        Article.find({author, status}).populate('author')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }


    static view(req,res,next){
        const {id} = req.params
        Article.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }, {new: true }).populate('author')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }


    static delete(req,res,next){
        const {id} = req.params
        Article.findByIdAndDelete(id)
        .then(data => {
            deleteBucket(data.imageUrl).then(data => {
                console.log('berhasil delete')
            })
            .catch(err => {
                console.log(err)
            })
            res.status(200).json({data})
        })
        .catch(next)
    }

}

module.exports = ArticleController