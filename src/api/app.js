const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const recipeRoute = require('./routes/recipes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipeRoute);

module.exports = app;
