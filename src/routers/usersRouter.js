const express = require('express');
const userController = require('../controller/userController');
const { validatePostLogin, isUniqueEmail } = require('../middleware/loginValidate');

const userRouter = express.Router();

userRouter.post('/', validatePostLogin, isUniqueEmail, userController.createUser);

module.exports = userRouter;
