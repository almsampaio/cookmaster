const express = require('express');

const recipesRouter = express.Router();
const auth = require('../middlewares/auth');
const { validateRecipe, validateIfUserIsAuth } = require('../middlewares/recipes');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updatedRecipe,
  deleteRecipe,
} = require('../controllers/recipes');

recipesRouter.post('/', auth, validateRecipe, createRecipe);
recipesRouter.get('/', validateIfUserIsAuth, getAllRecipes);
recipesRouter.get('/:id', getRecipeById);
recipesRouter.put('/:id', auth, updatedRecipe);
recipesRouter.delete('/:id', auth, deleteRecipe);

module.exports = recipesRouter;