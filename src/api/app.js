require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('../routes/usersRouter');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});

app.use('/users', usersRouter);

app.use((err, _req, res, _next) => {
  const { status, message } = err;

  res.status(status).json({
    message,
  });
});

module.exports = app;
