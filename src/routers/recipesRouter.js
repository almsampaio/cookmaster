const express = require('express');
const recipeController = require('../controller/recipesController');
const { existsRecipesFields, validateRecipeId } = require('../middleware/recipesValidate');
const { verifyToken } = require('../middleware/jwtValidate');

const recipesRouter = express.Router();

const PostValidations = [verifyToken, existsRecipesFields];

recipesRouter.post('/', ...PostValidations, recipeController.createRecipe);

recipesRouter.get('/', recipeController.getAllRecipes);

recipesRouter.get('/:id', validateRecipeId, recipeController.getById);

module.exports = recipesRouter;
