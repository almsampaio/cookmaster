const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const router = require('../routes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users/', router.usersRouter);
app.use('/login', router.loginRouter);
app.use('/recipes', router.recipesRouter);

module.exports = app;
