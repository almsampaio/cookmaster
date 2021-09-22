const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');
const { authMiddleware } = require('./auth/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Users
app.post('/users', userController.createUser);
app.post('/login', userController.userLogin);

// Recipes
app.post('/recipes', authMiddleware, recipesController.createRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipeByID);
app.put('/recipes/:id', authMiddleware, recipesController.updateRecipe);

module.exports = app;
