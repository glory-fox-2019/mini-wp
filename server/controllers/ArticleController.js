const Article = require('../models/Article')
const Tag = require('../models/Tag')

class ArticleController {
  static async create(req, res, next) {
    console.log('masuk controller create article')
    let { title, content} = req.body
    let tagInput = req.body.tags.split(',')
    let UserId = req.decode._id
    let fileUrl = req.file.cloudStoragePublicUrl
    // console.log('==============',{ tags })
    let tagId = []
    try {
      for (let tag of tagInput){
        let foundTag = await Tag.findOne({
          name: tag
        })

        if (!foundTag){
          let newTag = await Tag.create({
            name: tag
          })

          tagId.push(newTag._id)
        }
        else {
          tagId.push(foundTag._id)
        }
      }
      let newArticle = await Article.create({ title, content, fileUrl, UserId })

      let updatedArticle = await Article.findOneAndUpdate({
        _id: newArticle._id,
      },{
        $push: {
          tags: {
            $each: tagId
          }
        }
      },
      {
        new: true
      })

      res.status(201).json(updatedArticle)
    }
    catch(err){
      next(err)
    }
  }

  static ownArticle (req, res, next){
    console.log('masuk controller own article', req.decode._id)
    Article.find({
      UserId: req.decode._id
    }).populate('tags')
      .then((articles)=>{
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static searchArticle (req, res, next){
    console.log('masuk controller search article')
    if(req.params.title){
      Article.find({
        title :{
          $regex: new RegExp(req.params.title,'i')
        }
      }).populate('UserId').populate('tags')
        .then((articles)=>{
          res.status(200).json(articles)
        })
        .catch(next)
    }
    else {
      return ArticleController.allArticle()
    }
  }

  static async update(req, res, next){
    console.log('masuk controller update article')
    let input = {}
    req.body.title && (input.title = req.body.title)
    req.body.content && (input.content = req.body.content)
    req.file && (input.fileUrl = req.file.cloudStoragePublicUrl)
    // req.body.tags && (input.tags = req.body.tags.split(','))
    // console.log('=================', input.tags)
    let tagInput = req.body.tags.split(',')
    let tagId = []

    console.log(tagInput)
    try {
      await Article.updateOne({ _id: req.params.id}, {tags:[]})

      for (let tag of tagInput){
        let foundTag = await Tag.findOne({
          name: tag
        })

        if (!foundTag){
          let newTag = await Tag.create({
            name: tag
          })

          tagId.push(newTag._id)
        }
        else {
          tagId.push(foundTag._id)
        }
      }
    
      let newArticle = await Article.findOneAndUpdate({ _id: req.params.id},input)
      console.log('ini new article', newArticle)
      let updatedArticle = await Article.findOneAndUpdate({
        _id: newArticle._id,
      },{
        $push: {
          tags: {
            $each: tagId
          }
        }
      },
      {
        new: true
      })

      res.status(201).json(updatedArticle)
      
      
    }
    catch(err){
      next(err)
    }
 
  }

  static allArticle(req, res,next){
    console.log('masuk controller get all article')
    Article.find().populate('UserId').populate('tags')
      .then((articles)=>{
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findOne(req,res,next){
    console.log('masuk controller findone article', req.params.id)
    Article.findOne({
      _id: req.params.id
    }).populate('UserId').populate('tags')
      .then((article)=>{
        res.status(200).json(article)
      })
      .catch(next)
  }

  static delete(req, res, next){
    console.log('masuk controller delete article')
    Article.deleteOne({
      _id:req.params.id
    })
      .then((article)=>{
        res.status(200).json(article)
      })
      .catch(next)
  }

  static findBytag(req,res,next){
    Article.find({
      tags: { $in: [
        req.params.id
      ]}
    }).populate('tags')
      .then((articles)=>{
        res.status(200).json(articles)
      })
      .catch(next)
  }
}

module.exports = ArticleController