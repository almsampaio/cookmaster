const express = require('express');

const upload = require('../utils/uploadFile');

const Router = express.Router();

const authToken = require('../middlewares/authToken');
const authUserPermissions = require('../middlewares/authUserPermissions');
const authRequestRecipe = require('../middlewares/authRecipe');
const authRecipeId = require('../middlewares/authRecipeId');

const createRecipeController = require('../useCases/createRecipe/createRecipeController');
const listRecipeController = require('../useCases/listRecipes/listRecipesController');
const editRecipeController = require('../useCases/editRecipe/editRecipeController');
const deleteRecipeController = require('../useCases/deleteRecipe/deleteRecipeController');

Router.route('/')
  .get(
    listRecipeController.getAll,
  )
  .post(
    authToken, 
    authRequestRecipe,
    createRecipeController,
  );

Router.route('/:id/image')
    .put(
      authToken,
      authRecipeId,
      authUserPermissions,
      upload.single('image'),
      listRecipeController.getById,
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
    )
    .delete(
      authToken,
      authRecipeId,
      authUserPermissions,
      deleteRecipeController,
    );

module.exports = Router;
