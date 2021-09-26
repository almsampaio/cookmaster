const express = require('express');
const rescue = require('express-rescue');
const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();
recipesRouter.post('/', rescue(recipesController.addRecipe));
recipesRouter.get('/', rescue(recipesController.getAllRecipes));
recipesRouter.get('/:id', rescue(recipesController.getRecipeById));

module.exports = recipesRouter;
