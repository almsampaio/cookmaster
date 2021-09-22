const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
app.post('/users', usersController.create);
app.post('/login', loginController.logIn);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
