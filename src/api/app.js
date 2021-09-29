const express = require('express');
const bodyParser = require('body-parser');
const usersControllers = require('../../layers/users/usersControllers');
const loginControllers = require('../../layers/login/loginControllers');
const recipesControllers = require('../../layers/recipes/recipesControllers');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

// Todas as rotas a partir de /user serão tratadas no usersControllers;
app.use('/users', usersControllers);

// Todas as rotas a partir de /login serão tratadas no loginControllers;
app.use('/login', loginControllers);

// Todas as rotas a partir de /recipes serão tratadas no loginControllers;
app.use('/recipes', recipesControllers);

module.exports = app;
