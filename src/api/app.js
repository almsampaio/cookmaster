const express = require('express');
const bodyParser = require('body-parser');

const routerUser = require('./routerUser');

const app = express();

app.use(bodyParser.json());

app.use('/users', routerUser.Userrouter);
app.use('/login', routerUser.Authentication);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
