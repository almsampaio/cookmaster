const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const usersRouter = require('./Router/usersRouter');

app.use(bodyParser.json());

app.use('/users', usersRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
