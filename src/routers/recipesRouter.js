const express = require('express');
const rescue = require('express-rescue');

const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.addRecipes));
recipesRouter.get('/', rescue(recipesController.getRecipes));
recipesRouter.get('/:id', rescue(recipesController.getRecipesId));
recipesRouter.put('/:id', rescue(recipesController.editRecipesId));

module.exports = recipesRouter;
