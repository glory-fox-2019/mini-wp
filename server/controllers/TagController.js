const Tag = require('../models/Tag')

class TagController {
  static findAll(req,res,next){
    Tag.find()
      .then((tags)=>{
        res.status(200).json(tags)
      })
      .catch(next)
  }

  static findOne(req,res,next){
    Tag.find({
      _id: req.params.id
    })
      .then((tag)=>{
        res.status(200).json(tag)
      })
      .catch(next)
  }
}

module.exports = TagController