const express = require('express');
const rescue = require('express-rescue');
const controllers = require('../controllers');

const loginRouter = express.Router();

loginRouter.post('/', rescue(controllers.login));

module.exports = loginRouter;