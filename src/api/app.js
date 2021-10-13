const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');

const {
  authMiddleware, validateName, validateIngredients,
  validatePreparation } = require('../middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.create);
app.get('/users', usersController.getUsers);

app.post('/login', usersController.userLogin);

app.post('/recipes', validateName, validateIngredients, validatePreparation,
authMiddleware, recipesController.create);
app.get('/recipes', recipesController.getRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);

module.exports = app;
