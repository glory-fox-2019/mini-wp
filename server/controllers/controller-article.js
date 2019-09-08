const { Article, Tag } = require('../models');

class ControllerArticle {

    static find(req, res) {
        // console.log('masuk sini');
        const query = req.query ? req.query : ''

        Article
            .find({
                'title': new RegExp(query, 'i')
            })// -------------------------- cari lagi nanti
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getAllByOwner(req, res) {
        console.log('---------------msuk owner---- ');
        Article
            .find({
                owner: req.decoded.id
            })
            .populate('owner', 'name')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static getOne(req, res) {
        Article
            .findById(req.params.id)
            .populate('owner')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        // console.log('mmm');
        const { title, content, tags } = req.body
        const image = req.file ? req.file.cloudStoragePublicUrl : ''

        let owner = req.decoded.id
        let parserTags = []
        let newArticle = {}

        Article
            .create({
                title,
                content,
                image,
                tags: parserTags,
                owner
            })
            .then(article => {
                newArticle = article
                res.status(201).json(newArticle)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ msg: err })
            })
    }

    static update(req, res) {

        let updatedValue = {}

        // for(let key in req.body) {
        //     if(key == 'tags'){
        //         object.tags = []
        //         JSON.parse(req.body[key]).forEach(el => {
        //             object.tags.push(el)
        //         })
        //     }
        //     else {
        //         obj[key] = req.body[key]
        //     }
        // }

        const {title, content } = req.body

        updatedValue.title = title
        updatedValue.content = content        
        

        if(req.file){
            updatedValue.feature_image=req.file.cloudStoragePublicUrl
        }

        Article
            .findOneAndUpdate(
                { _id: req.params.id }, 
                updatedValue,
                { new: true, runValidators : true}
            )
            .then(article => {
                res.status(200).json(article)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Article
            .findByIdAndDelete({
                _id: req.params.id
            })
            .then(article => {
                if (article) res.status(200).json(article)
                else res.status(400).json({ err: 'article not found' })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}






module.exports = ControllerArticle


