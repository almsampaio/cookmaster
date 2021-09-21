const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const { authBasic } = require('../auth/basicAuth');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUser);
app.post('/login', usersController.loginUser);

app.post('/recipes', authBasic, recipesController.createRecipe);

module.exports = app;
