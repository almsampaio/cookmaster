const { Router } = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');
const recipesRouter = require('./recipes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', authRouter);
routes.use('/recipes', recipesRouter);

module.exports = routes;
