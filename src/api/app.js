require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const Middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.use('/users', routes.RoutesUsers);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(Middlewares.errorMiddlewares);

module.exports = app;
