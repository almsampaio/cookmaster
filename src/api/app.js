const express = require('express');
const bodyParser = require('body-parser');
const users = require('../controllers/users');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', users.createUser);
app.post('/login', users.createToken);

module.exports = app;
