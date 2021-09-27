const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const usersRouter = require('./Router/usersRouter');
const loginRouter = require('./Router/loginRouter');
const recipesRouter = require('./Router/recipesRouter');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
