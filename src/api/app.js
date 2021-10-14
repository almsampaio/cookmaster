const express = require('express');
const bodyParser = require('body-parser');
const userControllers = require('../controllers/users');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userControllers.create);
app.post('/login');

module.exports = app;
