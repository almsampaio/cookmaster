const express = require('express');
const recipeController = require('../controller/recipesController');
const { existsRecipesFields } = require('../middleware/recipesValidate');

const recipesRouter = express.Router();

recipesRouter.post('/', existsRecipesFields, recipeController.createRecipe);

module.exports = recipesRouter;
