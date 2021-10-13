const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('../controllers/usersController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.create);
app.get('/users', usersController.getUsers);

module.exports = app;
