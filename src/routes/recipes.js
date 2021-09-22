const express = require('express');

const recipesRouter = express.Router();
const auth = require('../middlewares/auth');
const { validateRecipe, validateIfUserIsAuth } = require('../middlewares/recipes');
const { createRecipe, getAllRecipes } = require('../controllers/recipes');

recipesRouter.post('/', auth, validateRecipe, createRecipe);
recipesRouter.get('/', validateIfUserIsAuth, getAllRecipes);
module.exports = recipesRouter;