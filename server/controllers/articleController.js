const Article = require("../models/article")
const { decoded } = require('../helpers/jwt')

class ArticleController{
    static findAll(req, res, next) {
        Article.find({
        })
        .sort([['createdAt', 'descending']])
        .populate('author')
        .populate('favouritedBy')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static searchById(req, res, next) {
        Article.findById(req.params.id)
        .then(data => {
            if (!data) res.status(404).json({ message: 'Not Found' })
                else res.status(200).json(data)
        }) 
        .catch(next)
    }

    static create(req, res, next){
        console.log("req file >>>", req.file.cloudStoragePublicUrl)
        let tags = req.body.tags.split(",")
        let obj = {
            title: req.body.title,
            content: req.body.content,
            author: req.decoded._id,
            featuredImage: req.file.cloudStoragePublicUrl,
            tags
        }
        Article.create(obj)
        .then(data => {
            console.log(data)
            res.status(200).json(data)           
        })
        .catch(next)
    }

    static update(req, res, next) { 
        let obj = {
            title: req.body.title,
            content: req.body.content,
            featuredImage: req.body.featuredImage,
            author: req.body.author,
            tags:req.body.tags
        }   
        Article.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                data.set(obj)
                return data.save()
            }
        }) 
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static favourited(req,res,next){
        let articleId= req.params.id
        let userId= req.body.userId

        Article.findById(articleId)
        .then(article =>{
            if(!article){
                throw {code: 404, message: 'Article not found'}
            }else{
                console.log('masuk else post')
                if(article.favouritedBy.includes(userId)){
                   return Article.findByIdAndUpdate(articleId , {$pull : { favouritedBy: userId }}, {new: true})
                }else{
                   return Article.findByIdAndUpdate(articleId, {$addToSet : { favouritedBy: userId }}, {new: true})
                }
            }
        })
        .then(post =>{
            console.log('berhasil update like');
            res.status(200).json(post)
        })
        .catch(next)
    }


    static getAllTags (req, res , next) {
        Article.find()
        .then(articles =>{
            var tags = []
            articles.forEach(article =>{
                article.tags.forEach(tag =>{
                    var includes = tags.includes(tag)
                    if(!includes) {
                        tags.push(tag)
                    }
                })
            })
            tags.sort(function(a, b) {
                var tagA = a.toUpperCase()
                var tagB = b.toUpperCase()
                if (tagA < tagB) {
                  return -1;
                }
                if (tagA > tagB) {
                  return 1;
                }
                return 0;
              });
            res.status(200).json(tags)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) res.status(404).json({ message: 'Not Found' })
                else res.status(200).json(req.params.id)
        }) 
        .catch(next)
    }
}

module.exports = ArticleController