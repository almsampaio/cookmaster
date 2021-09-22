const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const usersController = require('../controllers/usersController');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUser);
app.post('/login', usersController.loginUser);

module.exports = app;
