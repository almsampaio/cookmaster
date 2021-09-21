const express = require('express');
const bodyParse = require('body-parser');

const usersControllers = require('../controllers/users');

const app = express();

app.use(bodyParse.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersControllers.createUser);

module.exports = app;
