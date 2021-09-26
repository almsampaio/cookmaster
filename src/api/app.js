const express = require('express');
const bodyParser = require('body-parser');

const controllersUsers = require('../controllers/usersControlles');
const controllersLogin = require('../controllers/loginControlles');
const controllersRecipes = require('../controllers/recipesControlles');

const app = express();

app.use(bodyParser.json());

app.post('/users', controllersUsers.created);

app.post('/login', controllersLogin.loginUsers);

app.post('/recipes', controllersRecipes.createRecipe);

app.get('/recipes', controllersRecipes.getAllRecipes);

app.get('/recipes/:id', controllersRecipes.getByIdRecipe);

app.put('/recipes/:id', controllersRecipes.updateRecipe);

app.delete('/recipes/:id', controllersRecipes.excludeRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
