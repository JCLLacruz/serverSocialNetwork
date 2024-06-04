const Post = require('../models/Post');
const User = require('../models/User');

const PostController = {
	async create(req, res) {
		try {
			if (req.file) req.body.profileImg = req.file.filename;
			const post = await Post.create({ ...req.body, image_path: req.file.filename });
			await User.findByIdAndUpdate(req.user._id, { $push: { PostIds: {PostId: post._id} } });
			res.status(201).send({msg: 'Post is created',post});
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: 'There was a problem creating the post' });
		}
	},
	async update(req, res) {
		try {
			const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true });
			res.send({ msg: 'Post succesfully updated', Post });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: 'There was a problem updating the post' });
		}
	},
	async delete(req, res) {
		try {
			const post = await Post.findByIdAndDelete(req.params._id);
			res.send({ msg: 'Post deleted', post });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: 'There was a problem trying to remove the post' });
		}
	},
	async getAll(req, res) {
		try {
			const { page = 1, limit = 10 } = req.query;
			const posts = await Post.find()
			.populate('LikeIds.UserId')
			.limit(limit)
			.skip((page - 1) * limit);
			res.send({msg: 'All posts', posts});
		} catch (error) {
			console.error(error);
		}
	},
	async getPostsByTitle(req, res) {
		try {
			const posts = await Post.find({
				$text: {
					$search: req.params.title,
				},
			});
			res.send({msg: 'Post by title found',posts});
		} catch (error) {
			console.error(error);
		}
	},
	async getById(req, res) {
		try {
			const post = await Post.findById(req.params._id).populate('LikeIds.UserId');
			res.send({msg: 'Post by id found',post});
		} catch (error) {
			console.error(error);
		}
	},
	async like(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $push: { LikeIds: { UserId: req.user._id }}},
                { new: true }
            );
            res.send({msg: 'Post liked',post});
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "There was a problem with your like"});
        }
    },
    async dislike(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $pull: { LikeIds: { UserId: req.user._id }}},
				{new: true}
            );
            res.send({ msg: "Like deleted", post });
        } catch (error) {
            console.error(error)
            res.status(500).send({ msg: "There was a problem trying to remove the like"})
        }
    }  
};

module.exports = PostController;
