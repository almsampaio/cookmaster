const express = require('express');
const { login } = require('../controllers/LoginController');
const { createUser } = require('../controllers/UserController');
const validateLogin = require('../middlewares/validateLogin');
const validateUser = require('../middlewares/validateUser');
const validate = require('../schemas/validate');

const userRouter = express.Router();
const loginRouter = express.Router();

userRouter.post('/', validate('createUser'), validateUser, createUser);

loginRouter.post('/', validate('login'), validateLogin, login);

module.exports = { userRouter, loginRouter };
