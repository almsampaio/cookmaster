const express = require('express');
const bodyParser = require('body-parser').json();

const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');
const { validateToken, validateUser } = require('../middleware/validation');

const app = express();
app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.userRegistration);
app.post('/login', loginController.userLogin);
app.post('/recipes', validateToken, recipesController.recipesSubmit);
app.get('/recipes', recipesController.getRecipes);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', validateToken, validateUser,
  recipesController.editRecipe);

module.exports = app;
