const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../utils/validateJWT');

const app = express();
app.use(bodyParser.json());

app.get('/users/all', usersController.getAllUsers);

app.get('/users/email', usersController.getByEmail);

app.post('/users', usersController.createUser);

app.post('/login', usersController.loginUser);

app.get('/recipes', recipesController.getAllRecipes);

app.post('/recipes', validateJWT.validateJWT, recipesController.createRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
