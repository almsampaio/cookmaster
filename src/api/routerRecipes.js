const express = require('express');
const RecipesController = require('../Controller/RecipesController');
const recipeValidated = require('../middlewares/recipeValidated');
const validateJWT = require('./auth/validateJWT');

const Recipesrouter = express.Router();

// Requisito 3 - Cadastro de Receitas 
Recipesrouter.post('/', recipeValidated, validateJWT.authJWT, RecipesController.recipeRegistration);
// Requisito 4 - Lista todas as Receitas
Recipesrouter.get('/', RecipesController.listAllReceipes);

module.exports = { Recipesrouter };