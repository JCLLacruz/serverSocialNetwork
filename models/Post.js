const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    body: {
        type: String,
        required: [true, 'Please enter a body'],
    },
    image_path: String,
    UserId: {
        type: ObjectId,
        ref: 'User'
    },
    status: String,
    TagIds: [{
        TagId: {type: ObjectId, ref: 'Tag'}
    }],
    LikeIds: [{
        UserId: {type: ObjectId, ref: 'User'}
    }],
    CommentIds: [{
        type: ObjectId,
        ref: 'Comment'
    }],

}, { timestamps: true });

PostSchema.index({
    title: 'text',
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
