const express = require('express');
const RecipesController = require('../Controller/RecipesController');
const recipeValidated = require('../middlewares/recipeValidated');
const validateJWT = require('./auth/validateJWT');

const Recipesrouter = express.Router();

Recipesrouter.post('/', recipeValidated, validateJWT.authJWT, RecipesController.recipeRegistration);

module.exports = { Recipesrouter };