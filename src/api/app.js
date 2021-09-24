const express = require('express');
const bodyparser = require('body-parser');

const UserController = require('../controllers/userController');
const RecipeController = require('../controllers/recipeController');
const Login = require('../controllers/login');
const validateJWT = require('../api/auth/validateJWT');

const app = express();

app.use(bodyparser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UserController.create);
app.post('/login', Login);
app.post('/recipes', validateJWT, RecipeController.create);

module.exports = app;
