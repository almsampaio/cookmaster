const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

const router = require('../routes');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users/', router.usersRouter);
app.use('/login', router.loginRouter);
app.use('/recipes', router.recipesRouter);

module.exports = app;
