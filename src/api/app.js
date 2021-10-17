const express = require('express');
const path = require('path');
const routes = require('./routes');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

const app = express();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use(routes);
app.use(globalErrorHandler);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
