const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const {
  createUSer,
} = require('../controllers/Users');

app.use(bodyparser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUSer);

module.exports = app;
