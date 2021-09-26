const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const validUsers = require('./middlewares/userMiddleware');
const { authenticationMiddleware } = require('./middlewares/authenticationMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', validUsers.validateFields, usersController.createUser);
app.post('/login', usersController.findByPersonalData);
app.post('/recipes', authenticationMiddleware, recipeController.createRecipe);

module.exports = app;
