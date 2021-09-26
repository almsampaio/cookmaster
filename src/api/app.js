const express = require('express');

const app = express();

const {
  createUSer,
} = require('../controllers/Users');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUSer);

module.exports = app;
