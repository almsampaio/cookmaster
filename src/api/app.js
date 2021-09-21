const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', controllers.createUser);

module.exports = app;
