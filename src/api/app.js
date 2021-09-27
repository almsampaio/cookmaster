const express = require('express');
const bodyparser = require('body-parser');
const userController = require('../controllers/userController');

const app = express();
app.use(bodyparser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.post('/users', userController.create);

module.exports = app;
