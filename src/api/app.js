const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const route = require('../router/routes');

const app = express();
app.use(bodyParser.json());
app.use(route);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
