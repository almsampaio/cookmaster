const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userControlers = require('../Controllers/userControllers');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
// Onde vão ficar as rotas

app.post('/users', userControlers.create);
module.exports = app;
