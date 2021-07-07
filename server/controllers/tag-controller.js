const Tag = require('../models/tag')

class TagController {

    static getAllTags(req, res, next) {
        Tag.find()
            .then(tags => {
                tags.sort((a, b) => b.count - a.count)
                res.status(200).json(tags)
            })
            .catch(next)
    }

    static getPublishedTags(req, res, next) {

        Tag.find({
                count: {
                    $gt: 0
                }
            })
            .sort({
                count: -1
            })
            .limit(10)
            .then(tags => {
                res.status(200).json(tags)
            })
            .catch(next)
    }

}

module.exports = TagController