const { Router } = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', authRouter);

module.exports = routes;
