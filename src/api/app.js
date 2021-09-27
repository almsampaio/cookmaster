const express = require('express');
const bodyParser = require('body-parser');

const { UsersRouter, LoginRouter, RecipesRouter } = require('./Router');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/ping', (_req, res) => res.status(200).json({ message: 'pong' }));

app.use('/users', UsersRouter);
app.use('/login', LoginRouter);
app.use('/recipes', RecipesRouter);

module.exports = app;
