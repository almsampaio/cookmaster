const express = require('express');
const loginController = require('../controller/loginController');
const { existLogin, correctUser } = require('../middleware/loginValidate');

const loginRouter = express.Router();

loginRouter.post('/', existLogin, correctUser, loginController.login);

module.exports = loginRouter;
