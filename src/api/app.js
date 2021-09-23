const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../middleware/erroHandler');
const userRouter = require('../routers/usersRouter');
const loginRouter = require('../routers/loginRouter');

const app = express();
app.use(bodyParser.json());
app.use('/users', userRouter, errorHandler);
app.use('/login', loginRouter, errorHandler);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
