const express = require('express');
const bodyPaarser = require('body-parser');
const path = require('path');

const Routes = require('./routes');
const error = require('./middlewares/error');

const app = express();

app.use(bodyPaarser.json());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
app.use('/users', Routes.users);
app.use('/login', Routes.login);
app.use('/recipes', Routes.recipes);

app.use(error);

module.exports = app;
