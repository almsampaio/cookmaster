const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controller/ctrlUser');

const usersRouter = express.Router();

usersRouter.post('/', rescue(controller.createUser));

module.exports = usersRouter;