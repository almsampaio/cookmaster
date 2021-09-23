const express = require('express');

const usersController = require('../controllers/usersController');

const validateNewUser = require('../middlewares/validateNewUser');

const route = express.Router();

route.post('/', validateNewUser, usersController.create);

module.exports = route;