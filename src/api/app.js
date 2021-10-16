const express = require('express');
const routes = require('../routes');
const globalErrorHandler = require('../middlewares/globalErrorHandler');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(routes);
app.use(globalErrorHandler);

module.exports = app;
