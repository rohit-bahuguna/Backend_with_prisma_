const express = require('express');
const userRoute = express.Router();

const { signUp, logIn, logOut } = require('../controllers/userControllers');

userRoute.route('/signup').post(signUp);
userRoute.route('/login').post(logIn);
userRoute.route('/logout').get(logOut);

module.exports = userRoute;
