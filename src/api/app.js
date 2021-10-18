const express = require('express');
const bodyParser = require('body-parser');
const userControllers = require('../controllers/users');
const recipesController = require('../controllers/recipes');
const middleware = require('../middleware/validateToken');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userControllers.create);
app.post('/login', userControllers.findUser);
app.post('/recipes', middleware.checkToken, recipesController.createRecipes);
app.get('/recipes/:id', recipesController.getById);
app.get('/recipes', recipesController.getAll);

module.exports = app;
