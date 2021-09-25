const express = require('express');
const recipeController = require('../controller/recipesController');
const { existsRecipesFields, validateRecipeId } = require('../middleware/recipesValidate');
const { verifyToken, existsToken } = require('../middleware/jwtValidate');
const upload = require('../middleware/multerHandle');

const recipesRouter = express.Router();

const PostValidations = [verifyToken, existsRecipesFields];
const putValidations = [existsToken, verifyToken];

recipesRouter.post('/', ...PostValidations, recipeController.createRecipe);

recipesRouter.get('/', recipeController.getAllRecipes);

recipesRouter.get('/:id', validateRecipeId, recipeController.getById);

recipesRouter.put('/:id', putValidations, recipeController.recipeUpdate);

recipesRouter.delete('/:id', putValidations, recipeController.deleteById);

recipesRouter.put('/:id/image', putValidations, upload.single('image'), recipeController.addImg);

module.exports = recipesRouter;
