const { Router } = require('express');
const validateToken = require('../api/middlewares/validateJWT');
const recipeController = require('../controllers/recipes/recipeController');

const recipesRouter = Router();

recipesRouter.post('/recipes', validateToken, recipeController.createRecipeController);
recipesRouter.get('/recipes', recipeController.getAllRecipesController);
recipesRouter.get('/recipes/:id', recipeController.getRecipeByIdController);
recipesRouter.put('/recipes/:id', recipeController.editRecipeController);

module.exports = recipesRouter;