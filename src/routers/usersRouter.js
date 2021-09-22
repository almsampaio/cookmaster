const express = require('express');
const userController = require('../controller/userController');
const loginValidate = require('../middleware/loginValidate');

const userRouter = express.Router();

userRouter.post('/', loginValidate.validatePostLogin, userController.createUser);

module.exports = userRouter;
