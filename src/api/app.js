const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./router/users/usersRouter');
const loginRouter = require('./router/users/loginRouter');
const recipesRouter = require('./router/recipes/recipesRouter');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

module.exports = app;
