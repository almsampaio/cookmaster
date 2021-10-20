const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('../controllers/UserController');
// const RecipeController = require('./controllers/RecipeController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/users', UserController.create);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
