const express = require('express');
const rescue = require('express-rescue');
const { isAdmin } = require('../middlewares/users');
const validateToken = require('../middlewares/auth');

const route = express.Router();

const usersController = require('../controllers/users');
const { validateUserPayload } = require('../middlewares/users');

route.post('/', validateUserPayload, rescue(usersController.createUser));
route.post('/admin',
  validateUserPayload,
  validateToken,
  isAdmin, rescue(usersController.createUser));

module.exports = route;