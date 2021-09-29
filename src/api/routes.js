const express = require('express');
const UserValidation = require('../controllers/middlewares/validations/UserValidation');
const UserController = require('../controllers/UserController');
const LoginValidation = require('../controllers/middlewares/validations/LoginValidation');

const router = express.Router();

router.post('/users', UserValidation.execute, UserController.register);
router.post('/login', LoginValidation.execute, UserController.login);

module.exports = { router };
