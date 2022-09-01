const express = require('express');
const {
	createPost,
	showAllPost,
	deletePost,
	updatePost
} = require('../controllers/postControllers');

const isLoggedIn = require('../middleware/isLoggedIn');

const postRouter = express.Router();

postRouter.route('/post/create').post(isLoggedIn, createPost);

postRouter.route('/post/showall').get(showAllPost);

postRouter.route('/post/update/:id').put(isLoggedIn, updatePost);

postRouter.route('/post/delete/:id').delete(isLoggedIn, deletePost);

module.exports = postRouter;
