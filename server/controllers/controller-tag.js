const { Tag } = require('../models');

class ControllerTag {
    
    static list (req, res) {

        const limit = req.query.limit ? req.query.limit : ''

        Tag
            .find()
            .limit(Number(limit))
            .then(tags => {
                res.status(200).json(tags)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getByName(req, res) {
        if (req.query.q) {
            Tag
                .find({ name: re1.query.q })
                .populate({
                    path: 'articleId',
                    populate: {
                        path: 'owner'
                    }
                })
                .then(tags => {
                    res.status(200).json(tags)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
        else {
            Tag
                .find()
                .populate({
                    path: 'articleId',
                    populate: {
                        path: 'owner'
                    }
                })
                .then(tags => {
                    res.status(200).json(tags)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
    }
}

module.exports = ControllerTag