const express = require('express');

const Router = express.Router();

const authToken = require('../middlewares/authToken');
const authUserPermissions = require('../middlewares/authUserPermissions');
const authRequestRecipe = require('../middlewares/authRecipe');
const authRecipeId = require('../middlewares/authRecipeId');

const createRecipeController = require('../useCases/createRecipe/createRecipeController');
const listRecipeController = require('../useCases/listRecipes/listRecipesController');
const editRecipeController = require('../useCases/editRecipe/editRecipeController');

Router.route('/')
  .get(
    listRecipeController.getAll,
  )
  .post(
    authToken, 
    authRequestRecipe,
    createRecipeController,
  );

Router.route('/:id')
    .get(
      authRecipeId,
      listRecipeController.getById,
    )
    .put(
      authToken,
      authRecipeId,
      authRequestRecipe,
      authUserPermissions,
      editRecipeController,
    );

module.exports = Router;
