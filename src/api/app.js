const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const routes = require('../routes');
const { errorMiddleware } = require('../middlewares');

const app = express();

app.use(bodyParser.json());

app.use('/', rescue(routes));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(errorMiddleware);

module.exports = app;
