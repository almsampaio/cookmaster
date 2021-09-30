const Router = require('express').Router();
const Controller = require('../Controller');
const Middlewares = require('../Middlewares');

Router.get('/', Controller.recipes.getRecipes, Middlewares.error);
Router.post('/', Middlewares.validateJWT, Controller.recipes.postRecipe, Middlewares.error);

module.exports = Router;
