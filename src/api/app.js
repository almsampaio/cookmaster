const express = require('express');
const bodyParse = require('body-parser');

const {
  createUser,
  genToken,
} = require('../controllers/user');

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
} = require('../controllers/recipes');

const {
  validateName,
  validateEmail,
  validatePassword,
  validateLogin,
} = require('../middlewares/user');

const {
  validateRecipe,
  validateToken,
  validateId,
} = require('../middlewares/recipes');

const app = express();

app.use(bodyParse.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('Ola');
});

// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', validateName, validatePassword, validateEmail, createUser);
app.post('/login', validateLogin, genToken);

app.post('/recipes', validateRecipe, validateToken, createRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', validateId, getRecipeById);

module.exports = app;
