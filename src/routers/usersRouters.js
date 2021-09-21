const express = require('express');
const rescue = require('express-rescue');
const controllers = require('../controllers');

const usersRouter = express.Router();

usersRouter.post('/', rescue(controllers.createUser));

module.exports = usersRouter;