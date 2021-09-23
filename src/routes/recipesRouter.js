const { Router } = require('express');
const multer = require('multer');
const validateToken = require('../api/middlewares/validateJWT');
const recipeController = require('../controllers/recipes/recipeController');

const upload = multer({ dest: '../uploads/ ' });

const recipesRouter = Router();

recipesRouter.get('/recipes/:id', recipeController.getRecipeByIdController);
recipesRouter.put('/recipes/:id', validateToken, recipeController.editRecipeController);
recipesRouter.delete('/recipes/:id', validateToken, recipeController.deleteRecipeController);
recipesRouter.post('/recipes/:id', 
    upload.single('image'));
recipesRouter.post('/recipes', validateToken, recipeController.createRecipeController);
recipesRouter.get('/recipes', recipeController.getAllRecipesController);

module.exports = recipesRouter;