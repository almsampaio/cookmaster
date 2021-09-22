const express = require('express');
const BodyParser = require('body-parser');

const app = express();
app.use(BodyParser.json());
app.use(express.static(__dirname + '/uploads'));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
