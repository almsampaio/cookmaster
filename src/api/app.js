const express = require('express');

const bodyParser = require('body-parser').json;

const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');

const app = express();

app.use(bodyParser());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createNewUser);

app.post('/login', usersController.userLogin);

app.post('/recipes', recipesController.createRecipes);

module.exports = app;
