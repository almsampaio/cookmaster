const express = require('express');
const bodyParser = require('body-parser');

const Users = require('../controllers/usersController');
const Recipes = require('../controllers/recipesController');
// const login = require('../controllers/login');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Endpoint para Usuários

app.post('/login', Users.login);
app.post('/users', Users.create);

// Endpoit para Receitas

app.get('/recipes', Recipes.getAll);
app.post('/recipes', validateJWT, Recipes.create);

module.exports = app;
