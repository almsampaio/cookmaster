const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controller/userControlle');
const middleware = require('../middleware/middleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Users
app.post('/users', middleware.isValidEmail, userController.addUser);
app.get('/users', userController.findAll);

// login
app.post('/login', userController.login);

// recipes
app.post('/recipes', middleware.authToken, userController.addRecipes);

module.exports = app;
