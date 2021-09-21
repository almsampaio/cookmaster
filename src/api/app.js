const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const UserController = require('../controllers/UserController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users/', UserController.create);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
