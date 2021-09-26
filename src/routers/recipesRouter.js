const express = require('express');
const rescue = require('express-rescue');
const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();
recipesRouter.post('/', rescue(recipesController.addRecipe));
recipesRouter.get('/', rescue(recipesController.getAllRecipes));

module.exports = recipesRouter;
