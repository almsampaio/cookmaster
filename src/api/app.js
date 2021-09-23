const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./controllers/UsersController');
const recipesController = require('./controllers/RecipesController');

const validateUsers = require('./middlewares/UsersValidation');
const { authMiddleware } = require('./middlewares/AuthMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', validateUsers.validateFields, usersController.createUser);
app.post('/login', usersController.findByCredentials);

app.post('/recipes', authMiddleware, recipesController.createRecipe);
app.get('/recipes', recipesController.getAll);

module.exports = app;
