const Router = require('express').Router();
const Controller = require('../Controller');
const Middlewares = require('../Middlewares');

Router.get('/', Controller.recipes.getRecipes, Middlewares.error);

Router.put('/:id/image',
  Middlewares.validateJWT,
  Controller.recipes.putImage,
  Middlewares.error);

Router.get('/:id', Controller.recipes.getRecipeById, Middlewares.error);
Router.post('/', Middlewares.validateJWT, Controller.recipes.postRecipe, Middlewares.error);

Router.put('/:id', Middlewares.validateJWT, Controller.recipes.putRecipeById, Middlewares.error);

Router.delete('/:id',
Middlewares.validateJWT,
Controller.recipes.deleteRecipeById,
Middlewares.error);

module.exports = Router;
