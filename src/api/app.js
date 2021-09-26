const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipeController');
const authenticationUser = require('../validations/authenticationUser');

const app = express();
app.use(bodyParser.json());

app.post('/users', userController.createUser);
app.post('/login', loginController);
app.post('/recipes', authenticationUser, recipeController.createRecipe);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
