const express = require('express');
const usersControllers = require('../controllers/usersControllers');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersControllers.create);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
