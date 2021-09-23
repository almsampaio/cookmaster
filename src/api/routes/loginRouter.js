const express = require('express');

const usersController = require('../controllers/usersController');
const validateLogin = require('../middlewares/validateLogin');

const route = express.Router();

route.post('/', validateLogin, usersController.userLogin);

module.exports = route;