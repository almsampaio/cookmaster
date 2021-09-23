const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipesController');
const validateWebToken = require('./auth/validateToken');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.get('/recipes', recipeController.getAll);

app.post('/users', usersController.create);
app.post('/login', loginController.logIn);
app.post('/recipes', validateWebToken, recipeController.create);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
