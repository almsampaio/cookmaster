const express = require('express');
const { validatesUsers, validadteAdmin } = require('../middlewares/validades');
const authToken = require('../middlewares/authToken');

const Users = require('../controllers/users');

const UsersRouter = express.Router();

UsersRouter.post('/', validatesUsers, Users.createUser);
UsersRouter.post('/admin', authToken, validadteAdmin, Users.createAdmin);

module.exports = UsersRouter;