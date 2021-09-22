const { Router } = require('express');
const validateToken = require('../api/middlewares/validateJWT');
const recipeController = require('../controllers/recipes/recipeController');

const recipesRouter = Router();

recipesRouter.post('/recipes', validateToken, recipeController.createRecipeController);
recipesRouter.get('/recipes', recipeController.getAllRecipesController);

module.exports = recipesRouter;