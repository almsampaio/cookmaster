const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {
  usersRoutes,
  loginRoutes,
  recipesRoutes,
} = require('../routes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.use('/login', loginRoutes);

app.use('/recipes', recipesRoutes);

module.exports = app;
