const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const userRoutes = require('../../routes/users');
const login = require('../../routes/login');
const recipes = require('../../routes/recipes');
const imagesRoute = require('../../routes/images');

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRoutes);
app.use('/login', login);
app.use('/recipes', recipes);
app.use('/images', imagesRoute);

module.exports = app;
