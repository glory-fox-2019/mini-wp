const Tag = require('../models/tag');

class TagController {
  static create(req, res, next){
    Tag.create(req.body)
      .then(tag => {
        res.status(201).json(tag)
      })
      .catch(next)
  }
}

module.exports = TagController