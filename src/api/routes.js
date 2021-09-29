const express = require('express');
const UserValidation = require('../controllers/middlewares/validations/UserValidation');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/users', UserValidation.execute, UserController.register);

module.exports = { router };
