const { Schema, model, ObjectId } = require('mongoose');

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [ true, 'Name already exists' ]
  },
  ArticleId: [{ type: ObjectId, ref: 'Article' }]
}, { timestamps: true });

const Tag = model('Tag', tagSchema);

module.exports = Tag;