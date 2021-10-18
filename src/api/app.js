const express = require('express');
const bodyParser = require('body-parser');

const controllerUsers = require('../controllers/users');
const controllerLogin = require('../controllers/login');
const controllerRecipes = require('../controllers/recipes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', controllerUsers.create);

app.post('/login', controllerLogin.loginUser);

app.post('/recipes', controllerRecipes.create);
app.get('/recipes', controllerRecipes.getAll);

module.exports = app;
