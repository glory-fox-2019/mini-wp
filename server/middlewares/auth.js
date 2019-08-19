const jwt = require('jsonwebtoken');
const Article = require('../models/article');

module.exports = {
  authentication(req, res, next) {
    try {
      req.decoded = jwt.verify(req.headers.token, `${process.env.SECRET_TOKEN}`)
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  authorization(req, res, next) {
    Article.findOne({
      _id: req.params.id,
      UserId: req.decoded.id
    })
    .then(found => {
      if(!found) throw new Error('You dont have access')
      else next()
    })
    .catch(next)
  }
};