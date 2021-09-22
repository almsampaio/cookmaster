const express = require('express');
const bodyParser = require('body-parser');
const {
  createUser,
  login,
  createRecipe,
  authMiddleware,
  getAllRecipes,
  getRecipeById } = require('./routes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeById);

app.post('/users', createUser);
app.post('/login', login);
app.post('/recipes', authMiddleware, createRecipe);

module.exports = app;
