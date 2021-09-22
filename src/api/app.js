const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../controllers/users');
const Recipe = require('../controllers/recipes');
const Middlewares = require('../middlewares/recipes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', Users.create);

app.post('/login', Users.tokenGen);

app.post('/recipes', Middlewares.authToken, Recipe.create);
app.get('/recipes', Recipe.getAllRecipes);
app.get('/recipes/:id', Recipe.getRecipeById);

module.exports = app;
