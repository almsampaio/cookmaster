const express = require('express');
const rescue = require('express-rescue');

const route = express.Router();

const usersController = require('../controllers/users');
const { validateUserPayload } = require('../middlewares/users');

route.post('/', validateUserPayload, rescue(usersController.createUser));
route.post('/admin', rescue(usersController.createAdmin));

module.exports = route;