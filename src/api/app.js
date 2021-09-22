const express = require('express');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const userRouter = require('../routers/userRouter');

app.use('/users', userRouter);

const loginRouter = require('../routers/loginRouter');

app.use('/login', loginRouter);

const recipeRouter = require('../routers/recipeRouter');

app.use('/recipes', recipeRouter);

module.exports = app;
