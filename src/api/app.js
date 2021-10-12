const express = require('express');
const routes = require('../routes');

const app = express();
app.use(express.json());
app.use(routes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
