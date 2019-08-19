const Article = require('../models/article');
const axios = require('axios');

class ArticleController {

  static create(req, res, next) {  
    console.log(req.file.cloudStoragePublicUrl);
    const { title, content } = req.body
    Article.create({
      title,
      content,
      image: req.file.cloudStoragePublicUrl,
      UserId: req.decoded.id
    })
    .then(newArticle => {
      res.status(201).json(newArticle)
    })
    .catch(next)
  }

  static findAll(req, res, next) {
    Article.find().populate('UserId').sort([['createdAt', -1]])
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Article.findOne({
      _id: req.params.id
    }).populate('UserId')
    .then(found => {
      res.status(200).json(found)
    })
    .catch(next)
  }

  static destroy(req, res, next) {
    Article.deleteOne({
      _id: req.params.id
    })
    .then(response => {
      res.status(200).json({ message:'deleted' })
    })
    .catch(next)
  }

  static update(req, res, next) {
  
    const { title, content } = req.body
    Article.updateOne({
      _id: req.params.id
    }, { 
      title, content
    })
    .then(response => {
      res.status(200).json({ message: 'updated!' })
    })
    .catch(next)
    
  }
  
  static top(req, res, next){
    // axios({
    //   method: 'get',
    //   url: `https://newsapi.org/v2/top-headlines?country=id&apiKey=${process.env.API_KEY}`
    // })
    // .then(({ data }) => {
    //   // console.log(data.articles);
    //   const articles = data.articles.filter((el,index) => index < 5)
    //   res.status(200).json(articles)
    // })
    // .catch(next)
  }

  static myArticle(req, res, next){
    
    Article.find({
      UserId: req.decoded.id
    }).populate('UserId')
    .then(articles => {
      res.status(200).json(articles)
    })
    .catch(next)
  }

}

module.exports = ArticleController