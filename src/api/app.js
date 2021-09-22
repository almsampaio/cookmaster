const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('../routers/usersRouters');
const loginRouter = require('../routers/loginRouter');
const recipesRouter = require('../routers/recipesRouter');

const app = express();
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

app.use((error, _req, res, _next) => {
  res.status(error.status).json(error.err);
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
