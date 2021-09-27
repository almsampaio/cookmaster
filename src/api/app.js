const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');
const {
  validationCreateUser,
  validationLoginUser } = require('../middlewares/validateUser');
const {
  validationCreateRecipe,
  validationtoken } = require('../middlewares/validateRecipes');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

//  USER

app.post('/users', validationCreateUser, userController.create);
app.post('/login', validationLoginUser, userController.login);

// ______________________________________________________________ //

// RECIPES

app.post('/recipes', validationCreateRecipe, validationtoken, recipeController.create);
app.get('/recipes', recipeController.getAll);
app.get('/recipes/:id', recipeController.getById);
app.put('/recipes/:id', validationtoken, recipeController.update);

// ______________________________________________________________ //

module.exports = app;
