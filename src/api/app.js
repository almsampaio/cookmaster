const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const usersRouter = require('./Router/usersRouter');
const loginRouter = require('./Router/loginRouter');

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/login', loginRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
