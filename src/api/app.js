const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const route = require('../routes');
const error = require('../middlewares/Errors');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

route.users(app);
app.use(error);

module.exports = app;
