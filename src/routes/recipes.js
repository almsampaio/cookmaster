const express = require('express');
const { validateRecipes, validateId } = require('../middlewares/validades');
const authToken = require('../middlewares/authToken');
const Recipes = require('../controllers/recipes');
const upload = require('../middlewares/multer');

const RecipeRouter = express.Router();

RecipeRouter.post('/', validateRecipes, authToken, Recipes.createRecipe);
RecipeRouter.get('/', Recipes.getAll);
RecipeRouter.get('/:id', validateId, Recipes.getRecipe);
RecipeRouter.put('/:id', authToken, Recipes.editRecipe);
RecipeRouter.delete('/:id', authToken, Recipes.deleteRecipe);
RecipeRouter.put('/:id/image', authToken, upload.single('image'), Recipes.addImage);

module.exports = RecipeRouter;