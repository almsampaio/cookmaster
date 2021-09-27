const express = require('express');
const bodyparser = require('body-parser');

const UserController = require('../controllers/userController');
const RecipeController = require('../controllers/recipeController');
const Login = require('../controllers/login');
const validateJWT = require('../api/auth/validateJWT');
const authenticateUser = require('../api/auth/authenticateUser');

const app = express();

app.use(bodyparser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UserController.create);
app.post('/login', Login);
app.delete('/recipes/:id', validateJWT, RecipeController.remove);
app.get('/recipes/:id', RecipeController.find);
app.put('/recipes/:id', validateJWT, RecipeController.edit);
app.post('/recipes', validateJWT, RecipeController.create);
app.get('/recipes', RecipeController.getAll);

module.exports = app;
