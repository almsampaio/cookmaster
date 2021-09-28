const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controller/ctrlLogin');

const loginRouter = express.Router();

loginRouter.post('/', rescue(controller.makelogin));

module.exports = loginRouter;