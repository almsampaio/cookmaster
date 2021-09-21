const path = require('path');

const express = require('express');
const errorMiddleware = require('../middlewares/error');

const app = express();
require('dotenv').config();

const users = require('../routes/users');
const login = require('../routes/login');
const recipes = require('../routes/recipes');
const images = require('../routes/images');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', users);

app.use('/login', login);

app.use('/recipes', recipes);

app.use('/images', images);

app.use(errorMiddleware);

module.exports = app;
