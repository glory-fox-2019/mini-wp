const Article = require('../models/article')

module.exports = (req, res, next) => {
    Article.findOne({
        _id: req.params.id
    })
    .then(article => {
        if (article.author == req.decode._id) {
            next()
        }
        else {
            res.status(400).json("You are not authorized user")
        }
    })
    .catch(next)
}