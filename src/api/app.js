const bodyParser = require('body-parser');
const express = require('express');
const {
  validateUser,
} = require('../midlewares');
const {
  insertUserController,
} = require('../controlers');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users/', validateUser, insertUserController);

module.exports = app;
