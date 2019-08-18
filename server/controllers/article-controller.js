const Article = require('../models/article')
const Tag = require('../models/tag')
const {
    Storage
} = require('@google-cloud/storage')
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
})

class ArticleController {

    static async createArticle(req, res, next) {

        try {
            let tags = req.body.tags.split(',')
            let tagsId = []
            // ================== create new tags if new tags found
            if (tags[0] == "") {
                console.log('masuk ga ada ,<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                next({
                    code: 400,
                    message: 'Please input at least one tag'
                })
            }
            for (const tag of tags) {
                let foundTag = await Tag.findOne({
                    name: tag
                })

                if (!foundTag) {
                    let newTag = await Tag.create({
                        name: tag,
                        count: 0
                    })
                    tagsId.push(newTag._id)
                } else {
                    tagsId.push(foundTag._id)
                }
            }

            // ================== create new article
            if (!req.file) {
                next({
                    code: 400,
                    message: 'Please input featured image'
                })
            }

            let newArticle =
                await Article.create({
                    title: req.body.title,
                    content: req.body.content,
                    author: req.headers.decode.id,
                    featured_image: req.file.cloudStoragePublicUrl,
                    featured_image_name: req.file.cloudStorageObject,
                    isPublished: false
                })


            // ================== push tags on article
            let updatedArticle =
                await Article.findOneAndUpdate({
                    _id: newArticle._id
                }, {
                    $push: {
                        tags: {
                            $each: tagsId
                        }
                    }
                }, {
                    new: true
                })

            res.status(201).json(updatedArticle)
        } catch (err) {
            next(err)
        }


    }

    static getAll(req, res, next) {
        Article.find({
                author: req.headers.decode.id,
                isPublished: false
            })
            .populate('tags')
            .then(articles => {
                let allArticles = articles
                allArticles.sort((a, b) => b.updatedAt - a.updatedAt)
                res.status(200).json(allArticles)
            })
            .catch(next)
    }

    static getAllPublishedUser(req, res, next) {
        Article.find({
                author: req.headers.decode.id,
                isPublished: true
            })
            .populate('tags')
            .populate('author')
            .then(articles => {
                articles.sort((a, b) => b.updatedAt - a.updatedAt)
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static getAllPublishedGlobal(req, res, next) {
        Article.find({
                isPublished: true
            })
            .populate('tags')
            .populate('author')
            .then(articles => {
                articles.sort((a, b) => b.updatedAt - a.updatedAt)
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static async delete(req, res, next) {
        try {
            // get the will be deleted article
            let willBeDeleted = await Article.findById(req.params.articleId)

            // delete object on google storage
            await storage
                .bucket(process.env.CLOUD_BUCKET)
                .file(willBeDeleted.featured_image_name)
                .delete();

            // delete the article
            await Article.deleteOne({
                _id: req.params.articleId
            })

            // decrease related tags count
            if (willBeDeleted.isPublished) {
                for (const tag of willBeDeleted.tags) {
                    let currentTag = await Tag.findById(tag._id)
                    await Tag.updateOne({
                        _id: tag._id
                    }, {
                        $set: {
                            count: currentTag.count - 1
                        }
                    })
                }
            }

            res.status(200).json(willBeDeleted)
        } catch (error) {
            next(error)
        }
    }

    static getOne(req, res, next) {
        Article.findById(req.params.articleId)
            .populate('tags')
            .populate('author')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static preview(req, res, next) {
        Article.findById(req.params.articleId)
            .populate('tags')
            .populate('author')
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static async updateArticle(req, res, next) {

        try {
            let tags = req.body.tags.split(',')
            let willUpdated = await Article.findById(req.params.articleId)

            if (tags[0] == "") {
                console.log('masuk ga ada ,<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                next({
                    code: 400,
                    message: 'Please input at least one tag'
                })
            }
            let tagsId = []
            /*
            create new tags if new tags found 
            AND 
            increase tag count if tag already exist && current article isPublished
            */
            for (const tag of tags) {
                let foundTag = await Tag.findOne({
                    name: tag
                })
                if (!foundTag) {
                    let newTag = await Tag.create({
                        name: tag,
                        count: willUpdated.isPublished ? 1 : 0
                    })
                    tagsId.push(newTag._id)
                } else {
                    if (willUpdated.isPublished) {
                        await Tag.updateOne({
                            _id: foundTag._id
                        }, {
                            $set: {
                                count: foundTag.count + 1
                            }
                        })
                    }
                    tagsId.push(foundTag._id)
                }
            }

            // ================== delete image if user update featured image
            if (req.file) {
                await storage
                    .bucket(process.env.CLOUD_BUCKET)
                    .file(willUpdated.featured_image_name)
                    .delete();
            }

            // ================== decrease tag count if user delete tag when update
            if (willUpdated.isPublished) {
                let willUpdatedTags = willUpdated.tags
                let newIncomingTags = tagsId

                for (const previousTag of willUpdatedTags) {
                    if (!newIncomingTags.includes(previousTag)) {
                        let findTag = await Tag.findById(previousTag)
                        // console.log(findTag, 'founded tag <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                        await Tag.updateOne({
                            _id: findTag._id
                        }, {
                            $set: {
                                count: findTag.count - 1
                            }
                        })
                    }
                }
            }

            let update = {
                tags: []
            }
            req.body.title && (update.title = req.body.title)
            req.body.content && (update.content = req.body.content)
            req.file && (update.featured_image = req.file.cloudStoragePublicUrl)

            // upadte the article
            await Article.updateOne({
                _id: req.params.articleId
            }, {
                $set: update
            })

            let updatedData =
                await Article.findOneAndUpdate({
                    _id: req.params.articleId
                }, {
                    $push: {
                        tags: {
                            $each: tagsId
                        }
                    }
                }, {
                    new: true
                })

            res.status(200).json(updatedData)
        } catch (error) {
            next(error)
        }

    }

    static searchBySelectTag(req, res, next) {
        let tagId = req.params.tagId
        let config = {
            isPublished: req.query.isPublished
        }

        if (req.query.isGlobalPage == 'false') {
            config.author = req.headers.decode.id
        }

        Tag.findById(tagId)
            .then(tag => {
                return Promise.all([
                    Article.find(config)
                    .populate('tags')
                    .populate('author'),
                    tag
                ])
            })
            .then(([articles, searchTag]) => {
                let found = articles.filter(article => {
                    let tags = article.tags
                    let find = tags.find(tag => tag.name == searchTag.name)
                    if (find) return true
                })
                found.sort((a, b) => b.updatedAt - a.updatedAt)
                res.status(200).json(found)
            })
            .catch(next)
    }

    static normalSearch(req, res, next) {

        Article.find({
                author: req.headers.decode.id,
                isPublished: req.query.page == 'published' ? true : false
            })
            .populate('tags')
            .then(articles => {
                let found = []
                if (req.query.by == 'title') {
                    found = articles.filter(article => {
                        return article.title.toLowerCase().includes(req.query.keyword)
                    })
                    res.status(200).json(found)
                } else if (req.query.by == 'tag') {
                    found = articles.filter(article => {
                        let tags = article.tags
                        let find = tags.find(tag => tag.name.includes(req.query.keyword))
                        if (find) return true
                    })
                }
                found.sort((a, b) => b.updatedAt - a.updatedAt)
                res.status(200).json(found)
            })
            .catch(next)
    }

    static normalSearchGlobal(req, res, next) {
        Article.find({
                isPublished: true
            })
            .populate('tags')
            .then(articles => {
                let found = []
                if (req.query.by == 'title') {
                    found = articles.filter(article => {
                        return article.title.toLowerCase().includes(req.query.keyword)
                    })
                    res.status(200).json(found)
                } else if (req.query.by == 'tag') {
                    found = articles.filter(article => {
                        let tags = article.tags
                        let find = tags.find(tag => tag.name.includes(req.query.keyword))
                        if (find) return true
                    })
                }
                found.sort((a, b) => b.updatedAt - a.updatedAt)
                res.status(200).json(found)
            })
            .catch(next)
    }

    static async publishArticle(req, res, next) {

        try {
            let publishedArticle = await Article.findOneAndUpdate({
                _id: req.params.articleId
            }, {
                $set: {
                    isPublished: true
                }
            })

            for (const tag of publishedArticle.tags) {
                let currentTag = await Tag.findById(tag._id)

                await Tag.updateOne({
                    _id: tag._id
                }, {
                    $set: {
                        count: currentTag.count + 1
                    }
                })
            }

            res.status(200).json(publishedArticle)
        } catch (error) {
            next(error)
        }

    }
}

module.exports = ArticleController