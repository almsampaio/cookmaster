const express = require('express');

const Router = express.Router();

const authToken = require('../middlewares/authToken');
const authRecipe = require('../middlewares/authRecipe');
const authRecipeId = require('../middlewares/authRecipeId');

const createRecipeController = require('../useCases/createRecipe/createRecipeController');
const listRecipeController = require('../useCases/listRecipes/listRecipesController');

Router.route('/')
  .get(
    listRecipeController.getAll,
  )
  .post(
    authToken, 
    authRecipe,
    createRecipeController,
  );

Router.route('/:id')
    .get(
      authRecipeId,
      listRecipeController.getById,
    );

module.exports = Router;
