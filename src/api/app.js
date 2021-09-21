const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../../routes/userRouter');
const error = require('../../middlewares/error');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter, error);

module.exports = app;
