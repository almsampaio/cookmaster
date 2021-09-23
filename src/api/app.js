const express = require('express');
const bodyParser = require('body-parser');
const {
  createUser,
  login,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  authMiddleware, 
  updateRecipe, 
  removeRecipe } = require('./routes');

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

app.put('/recipes/:id', authMiddleware, updateRecipe);

app.delete('/recipes/:id', authMiddleware, removeRecipe);

module.exports = app;
