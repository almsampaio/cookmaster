const express = require('express');
const bodyParser = require('body-parser').json();

const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');

const app = express();
app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.userRegistration);
app.post('/login', loginController.userLogin);

module.exports = app;
