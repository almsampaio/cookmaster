const Router = require('express').Router();
const Controller = require('../Controller');
const Middlewares = require('../Middlewares');

Router.post('/', Middlewares.validateJWT, Controller.recipes.postRecipe, Middlewares.error);

module.exports = Router;
