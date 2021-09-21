const express = require('express');

const usersRouter = express.Router();
const { createUser } = require('../controllers/users');
const { userValidation } = require('../middlewares/user');

usersRouter.post('/', userValidation, createUser);

module.exports = usersRouter;