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

app.post('/users', Users.create);
app.post('/login', Users.login);

// Endpoint para Receitas

app.post('/recipes', validateJWT, Recipes.create);
app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.findById);
app.put('/recipes/:id', validateJWT, Recipes.update);
app.delete('/recipes/:id', validateJWT, Recipes.deleteInfo);

module.exports = app;
