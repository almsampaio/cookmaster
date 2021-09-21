const express = require('express');

const recipesRouter = express.Router();
const auth = require('../middlewares/auth');
const { validateRecipe } = require('../middlewares/recipes');
const { createRecipe } = require('../controllers/recipes');

recipesRouter.post('/', auth, validateRecipe, createRecipe);

module.exports = recipesRouter;