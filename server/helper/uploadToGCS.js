require('dotenv').config()
const {Storage} = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFileName: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const uploadToGCS = (req, res, next) => {
    if (!req.file) return next()

    const gcsname = Date.now() + req.file.originalname
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', (err) => {
        req.file.cloudStorageObject = gcsname
        file.makePublic()
            .then(() => {
                req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
                next()
            })
    })

    stream.end(req.file.buffer)
}

let Multer = require('multer');
    Multer = Multer({
        storage: Multer.memoryStorage,
        limits: {
            size: 5 * 1024 * 1024
        }
    })

module.exports = { getPublicUrl, uploadToGCS, Multer }
