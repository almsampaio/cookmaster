const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('../controllers/users');
const loginController = require('../controllers/login');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUser);
app.post('/login', loginController.loginUser);

module.exports = app;
