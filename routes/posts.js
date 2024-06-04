const express = require("express");
const router = express.Router()
const PostController = require("../controllers/PostController");
const { authentication,isAuthor } = require("../middleware/authentication");
const { uploadUserPostImages } = require('../middleware/multer.js');


router.post('/',uploadUserPostImages.single('postImg'), authentication, PostController.create);
router.put('/id/:_id', authentication, isAuthor, PostController.update);
router.delete('/id/:_id', authentication, isAuthor, PostController.delete);
router.get('/', authentication, PostController.getAll);
router.get('/title/:title', authentication, PostController.getPostsByTitle);
router.get('/id/:_id', authentication, PostController.getById);
router.put('/like/:_id', authentication, PostController.like);
router.delete('/like/:_id', authentication, PostController.dislike);

module.exports = router;