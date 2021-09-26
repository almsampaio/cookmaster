const express = require('express');

const Router = express.Router();

// const loginController = require('../useCases/login/loginController');
const authToken = require('../middlewares/authToken');
const authRecipe = require('../middlewares/authRecipe');
const createRecipeController = require('../useCases/createRecipe/createRecipeController');

Router.post(
  '/', 
  authToken, 
  authRecipe,
  createRecipeController,
);

module.exports = Router;
