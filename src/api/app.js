require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const usersRouter = require('../routes/usersRouter');
const loginRouter = require('../routes/loginRouter');
const recipesRouter = require('../routes/recipesRouter');

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

app.use((err, _req, res, _next) => {
  const { status, message } = err;
  const statusCode = status || 500;

  res.status(statusCode).json({
    message,
  });
});

module.exports = app;
