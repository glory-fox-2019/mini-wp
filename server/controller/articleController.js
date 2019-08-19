const Article = require('../model/article');
const { verifyToken } = require('../helper/jwt');

class ArticleController {

    static findAll(req, res, next) {
        Article.find({}, null, { sort: { createdAt: 'DESC' } })
            .populate('UserId')
            .then(function (articles) {
                res.status(200).json(articles);
            })
            .catch(next)
    }

    static create(req, res, next) {
        const UserId = req.decode._id
        const { title, content } = req.body;
        Article.create({
            title,
            content,
            UserId
        })
            .then(function (articles) {
                res.status(201).json(articles);
            })
            .catch(next);
    }

    static findByUserId(req, res, next) {
        const user = req.decode
        Article.find({
            UserId: user._id
        }, null, { sort: { createdAt: 'DESC' } })
        .populate('UserId')
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        const _id = req.params.articleId
        Article.findOne({
            _id
        })
            .populate('UserId')
            .then(function (artcile) {
                res.status(200).json(artcile)
            })
            .catch(next)
    }

    static edit(req, res, next) {
        const { title, content } = req.body;
        const _id = req.params.articleId;
        Article.findByIdAndUpdate({
            _id
        }, {
                title,
                content
            }, {
                new: true
            })
            .then(function (article) {
                res.status(201).json(article);
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.params.articleId;
        Article.deleteOne({
            _id
        })
            .then(function () {
                res.status(200).json({
                    message: `Delete Successful`
                })
            })
    }
}

module.exports = ArticleController;