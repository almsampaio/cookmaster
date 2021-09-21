const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/usersController');
const recipeController = require('../controllers/recipesController');

const app = express();
app.use(bodyParser.json());

app.get('/users', userController.getAll);

app.post('/users', userController.create);

app.post('/login', userController.findUser);

app.get('/recipes', recipeController.getAll);

app.post('/recipes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
