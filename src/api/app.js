const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('../routes/usersRouter');

const app = express();
app.use(bodyParser.json());
app.use(usersRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('*', (_req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

module.exports = app;
