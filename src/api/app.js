const express = require('express');
const bodyPaser = require('body-parser');
const erroMiddleware = require('../middlewares/error');
const routes = require('./routes');

const app = express();

app.use(bodyPaser.json());
app.use('/users', routes.Users);
app.use('/login', routes.Login);
app.use('/recipes', routes.Recipes);
app.use('/images', express.static('src/uploads'));

app.use(erroMiddleware);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
