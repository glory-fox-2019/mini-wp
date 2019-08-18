const Article = require('../models/article')

function authOwner(req,res,next){
    const {id} = req.params
    const author = req.decode.id
    Article.findById(id)
    .then(data => {
        if (data.author == author){
            next()
        } else {
            console.log(author, data.author)
            res.status(401).json({message : "your action fail!"})
        }
    })
    .catch(next)
}

module.exports = authOwner