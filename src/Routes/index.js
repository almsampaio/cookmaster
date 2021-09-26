const express = require('express');

const Router = express.Router();

const UserRoutes = require('./Users');
const LoginRoutes = require('./Login');
const RecipesRoutes = require('./Recipes');

Router.use('/users', UserRoutes);
Router.use('/login', LoginRoutes);
Router.use('/recipes', RecipesRoutes);

Router.get('/', (_request, response) => {
  response.send();
});

module.exports = Router;
