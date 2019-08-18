const { Article } = require('../models');

function authorize(err, req, res, next) {

    Article
        .findOne({
            _id: req.params.id,
            owner: req.params.id
        })
        .then(article => {
            if (article) {
                if (article.owner == req.decoded._id) {
                    next()
                } else {
                    res.status(401).json({ error: 'Forbident access' })
                }
            } else {
                res.status(403).json({ error: 'article not found' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })

}

module.exports = authorize