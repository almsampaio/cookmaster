const express = require('express');
const bodyParser = require('body-parser');
const { createUser, login, createRecipe, authMiddleware, getAllRecipes } = require('./routes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/recipes', getAllRecipes);

app.post('/users', createUser);
app.post('/login', login);
app.post('/recipes', authMiddleware, createRecipe);

module.exports = app;
