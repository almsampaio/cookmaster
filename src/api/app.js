const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('../controllers/UserController');
const RecipeController = require('../controllers/RecipeController');
const { validateJWT, validatePermission } = require('./auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/users', UserController.create);

app.post('/login', UserController.login);

app.get('/recipes/:id', RecipeController.getById);
app.get('/recipes', RecipeController.getAll);
app.post('/recipes', validateJWT, RecipeController.create);
app.put('/recipes/:id', validateJWT, validatePermission, RecipeController.update);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
