const express = require('express');
// const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// const multer = require('multer');

const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');
const { tokenAuthorization } = require('../../services/tokenAuthorization');

const app = express();

app.use(bodyParser.json());

app.post('/users', userController.registerUser);

app.post('/login', userController.checkLogin);

app.post('/recipes', tokenAuthorization, recipeController.registerRecipe);

app.get('/recipes', recipeController.getRecipes);

app.get('/recipes/:id', recipeController.gettingOneRecipe);

app.put('/recipes/:id', tokenAuthorization, recipeController.editingRecipe);

app.delete('/recipes/:id', tokenAuthorization, recipeController.deletingRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
