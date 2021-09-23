const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../../routes/users');
const login = require('../../routes/login');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRoutes);
app.use('/login', login);

module.exports = app;
