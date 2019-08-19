const Article = require('../models/articles')
const User = require('../models/user')
const env = require('dotenv').config()
class articleController {
    static create(req, res, next) {
        console.log('masuk siniiiiiiiii')
        console.log(req.decoded)
        Article.create({
           title: req.body.title,
           content: req.body.content,
           userId: req.decoded.id
        })

        .then((article) => {
            console.log(article)
            res.status(200).json({article})
        })
        .catch((err) => {
            console.log('masuk sini')
            console.log(err)
            next(err)
        })
    }

    static findAll(req, res, next) {
        console.log('masuk siniiiiiiiii')
        // console.log(req.decode)
        Article.find()
        .then((articles) => {
            res.status(200).json(articles)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
    }

    static articleUser(req, res, next) {
        Article.find({
            userId: req.decoded.id
        })
        .then((articles) => {
            console.log(req.decoded, '<<<<<<<<<<<<<<<<<===================')
            res.status(200).json(articles)
        })
        .catch((err) => {
            console.log(req.decoded, '===========================')
            console.log(err)
            next(err)
        })
    }

    static findOne(req, res, next) {
        Article.findById({
            _id: req.params.id
        })
        .then((article) => {
            res.status(200).json({article})
        })
        .catch((err) => {
            next(err)
        })
    }

    static update(req, res, next) {
        const updatedArticle = {
            title : req.body,
            content : req.body
        }
        Article.update({
            _id: req.params._id
        }, {
            $set : updatedArticle
        })
        .then(() => {
            res.status(200).json({
                message: 'success update data'
            })
        })
        .catch((err) => {
            next(err)
        })
    }

    static delete(req, res, next) {
        Article.deleteOne({id:req.params.id})
        .then(() => {
            res.status(200).json({
                message: 'success delete data'
            })
        })
        .catch((err) => {
            // console.log('masuk sini')
            console.log(err)
            next(err)
        })
    }

    static filterByTitle(req, res, next) {
        const search = new RegExp(req.query.title, 'i')
        Article.find({
            title: search
        })
        .then((found) => {
            res.status(200).json({found})
        })
        .catch((err) => {
            next(err)
        })
    }

    
}

module.exports = articleController