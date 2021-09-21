const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const usersController = require('../controllers/usersController');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUser);

module.exports = app;
