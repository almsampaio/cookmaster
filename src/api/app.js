const express = require('express');
const bodyParser = require('body-parser');

const routerUser = require('./routerUser');
const routerRecipes = require('./routerRecipes');
const routerAdmin = require('./routerAdmin');

const app = express();

app.use(bodyParser.json());

app.use('/users', routerUser.Userrouter);
app.use('/users', routerAdmin.Adminrouter);
app.use('/login', routerUser.Authentication);
app.use('/recipes', routerRecipes.Recipesrouter);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
