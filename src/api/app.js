const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userControlers = require('../Controllers/userControllers');
const middleware = require('../Services/middlewares');
const recipesControlers = require('../Controllers/recipesController');
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
// Onde vão ficar as rotas

app.post('/users', userControlers.create);

app.post('/login', userControlers.login);

app.post('/recipes', middleware.create, recipesControlers.createRecipe);

app.get('/recipes', recipesControlers.getAllRecipe);

app.get('/recipes/:id', recipesControlers.getRecipeById);

app.put('/recipes/:id', middleware.create, recipesControlers.updateRecipe);

app.delete('/recipes/:id', middleware.create, recipesControlers.removeRecipe);

module.exports = app;
