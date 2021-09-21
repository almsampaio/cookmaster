const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

const usersRoute = require('./routes/usersRoute');

app.use('/', usersRoute);

module.exports = app;
