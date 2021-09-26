const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUSers);

app.post('/login', loginController.login);

app.post('/recipes', auth.validateJWT, recipeController.createRecipe);

app.get('/recipes', recipeController.getRecipes);

app.get('/recipes/:_id', recipeController.getRecipeById);

app.put('/recipes/:_id', admin, recipeController.editeRecipe);

app.delete('/recipes/:_id', admin, recipeController.deleteRecipe);

module.exports = app;
