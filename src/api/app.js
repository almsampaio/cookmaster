const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const userMiddlewares = require('../middlewares/userMiddlewares');
const recipeMiddlewares = require('../middlewares/recipeMiddlewares');
const authMiddlewares = require('../middlewares/authMiddlewares');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Users
app.post('/users', 
userMiddlewares.validateName,
userMiddlewares.validateEmail,
userController.create);

app.post('/login', 
userMiddlewares.validateLogin, 
userController.login);

// Recipes
app.post('/recipes', 
recipeMiddlewares.validateRecipe,
authMiddlewares.authValidation,
recipeController.create);

app.get('/recipes', 
recipeController.getAll);

app.get('/recipes/:id', 
recipeController.getById);

app.put('/recipes/:id',
authMiddlewares.authValidation,
recipeController.update);

app.delete('/recipes/:id',
authMiddlewares.authValidation,
recipeController.exclude);

module.exports = app;
