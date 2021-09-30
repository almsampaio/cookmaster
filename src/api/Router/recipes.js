const Router = require('express').Router();
const Controller = require('../Controller');
const error = require('../Middlewares/error');

Router.post('/', Controller.recipes.postRecipe, error);

module.exports = Router;
