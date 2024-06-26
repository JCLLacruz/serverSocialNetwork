const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');
const { uploadImageToImgur } = require('../config/imgurUploader.js');
const path = require('path');


const PostController = {
	async create(req, res) {
		try {
			if (!req.file) {
				req.body.image_path = 'nonPostImage';
			} else {
				req.body.image_path = req.file.filename;
				const staticDir = path.join(req.file.destination);
				const imagePath = path.join(staticDir, req.file.filename);
				const mainDirPath = path.join(__dirname, '..');
				req.body.image_path = await uploadImageToImgur(mainDirPath +"/"+imagePath) || req.file.filename
			}
			console.log(req.body);
			const post = await Post.create({ ...req.body, image_path: req.body.image_path, UserId: req.user._id });
			await User.findByIdAndUpdate(req.user._id, { $push: { PostIds: post._id } });
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
			const { page = 1, limit = 9 } = req.query;
			const posts = await Post.find()
			.populate('LikeIds')
			.populate('CommentIds')
			.populate('TagIds')
			.populate('UserId')
			.limit(limit)
			.skip((page - 1) * limit);
			res.send({msg: 'All posts', posts});
		} catch (error) {
			console.error(error);
		}
	},
	async getPostsByTitle(req, res) {
		try {
			if (req.params.title.length > 20){
				return res.status(400).send('Search to long.')
			}
			const title = new RegExp(req.params.title, 'i');
			const posts = await Post.find({title})
			.populate('LikeIds')
			.populate('CommentIds')
			.populate('TagIds')
			.populate('UserId');
			res.send({msg: 'Posts by title found',posts});
		} catch (error) {
			console.error(error);
		}
	},
	async getById(req, res) {
		try {
			const post = await Post.findById(req.params._id)
			.populate('LikeIds')
			.populate('CommentIds')
			.populate('TagIds')
			.populate('UserId')
			.populate('LikeIds')
			.populate('CommentIds')
			res.send({msg: 'Post by id found',post});
		} catch (error) {
			console.error(error);
		}
	},
	async like(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $push: { LikeIds: req.user._id }},
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
    }, 
	async getUserPosts(req, res){
		try{
			const ids =req.user.PostIds.map((PostIdObject)=>{return PostIdObject})
			const posts = await Post.find({ _id: { $in: ids } }).populate('LikeIds.UserId')
			res.send({ msg: "Posts", posts });
		}
		catch(error){
			console.error(error)
            res.status(500).send({ msg: "There was a problem searching posts by Ids"})
		}
	}
};

module.exports = PostController;
