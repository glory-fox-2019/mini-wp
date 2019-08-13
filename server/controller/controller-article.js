const { article } = require('../models');

class ControllerArticle {
    static create(req, res) {

        let { title, description, duedate } = req.body
        let todoCreate = ''

        modelTodo.create({
            owner: req.headers.id, title, description, duedate
        })
            .then(todo => {
                todoCreate = todo
                res.status(201).json(todoCreate)
            })
            .catch(err => {
                res.status(400).json({ msg: err })
            })
    }

    
}

module.exports = ControllerArticle


