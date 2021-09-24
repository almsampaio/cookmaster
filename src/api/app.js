const express = require('express');
const bodyParser = require('body-parser');
const { validateUsers } = require('../Services/usersService');
const usersController = require('../Controllers/usersController');

const app = express();
app.use(bodyParser.json());

app.post('/users', validateUsers, usersController.create);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('teste');
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
