const express = require('express');
const rescue = require('express-rescue');
const controller = require('../controller/ctrlRecipes');

const recipesRouter = express.Router();

recipesRouter.get('/', rescue(controller.getOne));

recipesRouter.post('/', rescue(controller.creatRecipe));

module.exports = recipesRouter;
