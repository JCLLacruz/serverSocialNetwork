const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET, API_URL } = process.env;
const transporter = require('../config/nodemailer.js');
const { uploadImageToImgur } = require('../config/imgurUploader.js');
const path = require('path');

const UserController = {
	async register(req, res) {
		try {
			if (!req.file) {
				req.body.profileImg = 'nonProfileImage';
			} else {
				req.body.profileImg = req.file.filename;
				const staticDir = path.join(req.file.destination);
				const imagePath = path.join(staticDir, req.file.filename);
				const mainDirPath = path.join(__dirname, '..');
				req.body.profileImg = await uploadImageToImgur(mainDirPath +"/"+imagePath) || req.file.filename
				
			}
			if (
				req.body.username == '' ||
				req.body.email == '' ||
				req.body.password == '' ||
				req.body.birthday == '' ||
				req.body.firstname == '' ||
				req.body.lastname == ''
			) {
				return res.send({ msg: 'Please fill out all required fields.' });
			}
			const password = await bcrypt.hash(req.body.password, 10);
			const user = await User.create({
				...req.body,
				password,
				role: 'user',
				emailConfirmed: false,
				online: false,
				image_path: req.body.profileImg,
			});
			const emailToken = jwt.sign({ email: req.body.email }, JWT_SECRET, { expiresIn: '48h' });
			const url = API_URL + '/users/confirm/' + emailToken;
			await transporter.sendMail({
				to: req.body.email,
				subject: 'Please confirm your email.',
				html: `<h3> Welcome to Happy Network, only one step more to enjoy!</h3>
				<a href=${url}>Click to confirm your email</a>`,
			});
			res.status(201).send({ msg: `The user's email must be confirmed.`, user });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: 'Server error.', error });
		}
	},
	async confirmUser(req, res) {
		try {
			const emailToken = req.params.emailToken;
			const payload = jwt.verify(emailToken, JWT_SECRET);
			await User.updateOne({ email: payload.email }, { $set: { emailConfirmed: true } });
			res.status(201).send({ msg: 'User email was confirmed. User created.' });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async login(req, res) {
		try {
			const user = await User.findOne({
				email: req.body.email,
			})
			.populate('PostIds')
			.populate('CommentIds')
			.populate('TagIds')
			.populate('FollowerIds')
			.populate('FollowIds');
			if (!user) {
				return res.status(400).send({ msg: 'Email or password are wrong.' });
			}
			const isMatch = await bcrypt.compare(req.body.password, user.password);
			if (!isMatch) {
				return res.status(400).send({ msg: 'Email or password are wrong.' });
			}
			const token = jwt.sign({ _id: user._id }, JWT_SECRET);
			if (user.tokens.length > 4) user.tokens.shift();
			user.tokens.push(token);
			await user.save();
			res.send({ msg: `Welcome ${user.firstname}.`, user, token });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	async allOnlineUsers(req, res) {
		try {
			const users = await User.find({ online: true })
			.populate('PostIds')
			.populate('CommentIds')
			.populate('TagIds')
			.populate('FollowerIds')
			.populate('FollowIds');;
			res.send({ msg: 'Online users', users });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: 'Server error.', error });
		}
	},
	async findUserById(req, res) {
		try {
			const user = await User.findOne({ _id: req.params._id })
			.populate('PostIds')
			.populate('CommentIds')
			.populate('TagIds')
			.populate('FollowerIds')
			.populate('FollowIds');;
			res.send({ msg: `User with id: ${req.params._id} was found.`, user });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: `The user with id: ${error.value} does not exist in the database.`, error });
		}
	},
	async findUserByName(req, res) {
		try {
			const username = new RegExp(req.params.username, 'i');
			const user = await User.find({username})
			.populate('PostIds')
			.populate('CommentIds')
			.populate('TagIds')
			.populate('FollowerIds')
			.populate('FollowIds');;
			res.send({ msg: `Users with username like : ${req.params.username} were found.`, user });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: `The user with name: ${req.params.username} does not exist in the database.`, error });
		}
	},
	async logout(req, res) {
		try {
			const user = await User.findByIdAndUpdate(
				{ _id: req.user._id },
				{ $pull: { tokens: req.headers.authorization }, $set: { online: false } },
				{ new: true }
			);
			res.send({ msg: 'User logged out', user });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: `User not logged out properly.`, error });
		}
	},
	async getOnline(req, res) {
		try {
			const user = await User.findOne({ _id: req.params._id });
			if (!user.online) {
				user.online = true;
				await user.save();
				return res.send({ msg: `User with Id: ${req.params._id} ist online`, user });
			} else {
				user.online = false;
				await user.save();
				return res.send({ msg: `User with Id: ${req.params._id} ist offline`, user });
			}
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: `User status not changed.`, error });
		}
	},
	async follow(req, res) {
		try {
			const user = await User.findByIdAndUpdate(
				{ _id: req.user._id },
				{ $push: { FollowIds: req.params._id } },
				{ new: true }
			).populate('FollowIds');
			const follower = await User.findByIdAndUpdate({ _id: req.params._id }, { $push: { FollowerIds: user._id } });
			res.send({ msg: `You follow now ${follower.username}`, user });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: `User didn't follow.`, error });
		}
	},
	async unfollow(req, res) {
		try {
			const user = await User.findByIdAndUpdate(
				{ _id: req.user._id },
				{ $pull: { FollowIds: req.params._id } },
				{ new: true }
			).populate('FollowIds');
			const follower = await User.findByIdAndUpdate({ _id: req.params._id }, { $pull: { FollowerIds: user._id } });
			res.send({ msg: `You unfollow now ${follower.username}`, user });
		} catch (error) {
			console.error(error);
			res.status(500).send({ msg: `User didn't unfollow.`, error });
		}
	},
	async userInfo(req, res) {
		const user = await User.findById(req.user._id)
		.populate('PostIds')
		.populate('CommentIds')
		.populate('TagIds')
		.populate('FollowerIds')
		.populate({path: 'FollowIds',populate: {path: 'PostIds'}});
		res.send({ msg: 'User info:', user });
	},
	async recoverPassword(req, res) {
		try {
			const recoverToken = jwt.sign({ email: req.params.email }, JWT_SECRET, {
				expiresIn: '48h',
			});
			const url = API_URL + '/users/resetPassword/' + recoverToken;
			await transporter.sendMail({
				to: req.params.email,
				subject: 'Recover password',
				html: `<h3> Recover password </h3>
	  <a href="${url}">Recover password</a>
	  You have only 48 hours to change the password with these email.
	  `,
			});
			res.send({
				msg: 'A recover email was sended to your email',
			});
		} catch (error) {
			console.error(error);
		}
	},
	async resetPassword(req, res) {
		try {
			const recoverToken = req.params.recoverToken;
			const payload = jwt.verify(recoverToken,JWT_SECRET);
			await User.findOneAndUpdate({ email: payload.email }, { password: req.body.password });
			res.send({ msg: 'Password was changed' });
		} catch (error) {
			console.error(error);
		}
	},
	async updateUser(req, res, next) {
		if (!req.file) {
			req.body.profileImg = 'nonProfileImage';
		} else {
			req.body.profileImg = req.file.filename;
			const staticDir = path.join(req.file.destination);
			const imagePath = path.join(staticDir, req.file.filename);
			const mainDirPath = path.join(__dirname, '..');
			req.body.profileImg = await uploadImageToImgur(mainDirPath +"/"+imagePath) || req.file.filename

		}
        try {
            const oldUser = await User.findById(req.user._id);
            const image_path = req.body.profileImg != 'nonProfileImage'? req.body.profileImg:oldUser.image_path
            const newUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                 username:req.body.username,
				 firstname:req.body.firstname,
				 lastname:req.body.lastname,
				 birthday:req.body.birthday,
				 image_path
                },
                { new: true },
            ).populate('PostIds')
			.populate('CommentIds')
			.populate('TagIds')
			.populate('FollowerIds')
			.populate({path: 'FollowIds',populate: {path: 'PostIds'}});
            res.status(200).send({
                msg: "User successfully updated",
                oldUser,
                newUser,
            });
        } catch (error) {
            console.error(error);
            res.send({ msg: "user with Id: " + req.user.id + " not found", 
					userNotFound: req.user
			 });
        }
    },
	async getAllUsers (req, res){
		try{
			const { page = 1, limit = 9 } = req.query;
			const users= await User.find()
			.limit(limit)
			.skip((page - 1) * limit);
			res.status(200).send({msg: "users found", users});
		}catch(error){
			console.error(error)
		}
	}
};

module.exports = UserController;
