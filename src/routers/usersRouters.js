const express = require('express');
const rescue = require('express-rescue');
const controllers = require('../controllers');
const auth = require('../middlewares/auth');

const usersRouter = express.Router();

usersRouter.post('/', rescue(controllers.createUser));
usersRouter.post('/admin', auth, rescue(controllers.createAdmin));

module.exports = usersRouter;