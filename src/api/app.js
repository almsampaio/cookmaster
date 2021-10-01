const express = require('express');
const bodyParser = require('body-parser');

const users = require('../controllers/usersController');
const recipes = require('../controllers/recipesController');

const jwt = require('../middlewares/jwtValidate');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', users.addUser);
app.post('/login', users.login);
app.post('/recipes', jwt, recipes.addRecipe);
app.get('/recipes', recipes.getAllRecipes);

module.exports = app;
