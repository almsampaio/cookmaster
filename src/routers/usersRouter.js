const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.post('/', rescue(usersController.addUser));

module.exports = usersRouter;
