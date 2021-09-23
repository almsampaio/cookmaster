const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRouter = require('../routers/userRouter');
const loginRouter = require('../routers/loginRouter');
const recipesRouter = require('../routers/recipeRouter');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/image', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
