const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./rotas/users/usersRouter');
const loginRouter = require('./rotas/users/loginRouter');
const recipesRouter = require('./rotas/recipes/recipesRouter');

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
