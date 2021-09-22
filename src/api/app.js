const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

// ---------------------------------------------------- Users ---------------------------------------------------- //

const userRouter = require('./router/userRouter');
const loginRouter = require('./router/loginRouter');

app.use('/users', userRouter);

app.use('/login', loginRouter);

// ---------------------------------------------------- Recipes ---------------------------------------------------- //

const recipeRouter = require('./router/recipeRouter');

app.use('/recipes', recipeRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
