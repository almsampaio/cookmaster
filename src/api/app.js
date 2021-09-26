const express = require('express');
// const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// const multer = require('multer');

const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');

const app = express();

app.use(bodyParser.json());

app.post('/users', userController.registerUser);

app.get('/login', userController.checkLogin);

app.get('/recipes', recipeController.getRecipes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
