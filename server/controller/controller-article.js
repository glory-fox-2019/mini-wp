const { Article } = require('../models');

class ControllerArticle {

    static create(req, res) {

        // console.log(req.body);

        let { title, content } = req.body

        Article
            .create({
                title, content
            })
            .then(article => {
                res.status(201).json(article)
            })
            .catch(err => {
                res.status(400).json({ msg: err })
            })
    }

    static fetchArticle(req, res) {
        // console.log('masuk fetch');
        Article
            .find()
            .then(articles => {
                // console.log(articles);
                res.status(200).json(articles)
            })
            .catch(err => {
                res.status(400).json({ msg: err })
            })
    }

    static delete(req, res) {
        // console.log(req.params.id, '<-------------------');
        Article
            .deleteOne({
                _id: req.params.id
            })
            .then(article => {
                // console.log('masuk delete');
                res.status(200).json(article)
            })
            .catch(err => {
                res.status(400).json({ msg: err })
            })
    }

    static getOne(req, res) {
        Article
            .findById({
                _id: req.params.id
            })
            .populate('Article')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static update(req, res) {
        // console.log('============================');
        let {title, content} = req.body
        Article
            .updateOne({
                _id: req.params.id
            },{
                title, content
            })
            .then(article => {
                // console.log('masuk edit');
                res.status(200).json(article)
            })
            .catch(err => {
                // console.log('masuk error update');
                res.status(400).json(err)
            })
    }
}






module.exports = ControllerArticle


