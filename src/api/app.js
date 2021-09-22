const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('../routes/users');
const errors = require('../middlewares/error');
const loginRoutes = require('../routes/login');
const recipesRoutes = require('../routes/recipes');

const app = express();

app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/recipes', recipesRoutes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});

app.use(errors);

module.exports = app;