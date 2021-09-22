const bodyParser = require('body-parser');
const express = require('express');

const usersController = require('../controllers/users');
const loginController = require('../controllers/login');
const recipesController = require('../controllers/recipes');
const errors = require('../middlewares/errors');
const authenticate = require('../middlewares/authenticate');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.route('/users')
  .post(usersController.registerUser);

app.route('/login')
  .post(loginController.login);

app.route('/recipes')
  .post(authenticate, recipesController.createRecipe)
  .get(recipesController.getRecipes);

app.route('/recipes/:id')
  .get(recipesController.getRecipeById)
  .put(authenticate, recipesController.editRecipeById);

app.use(errors);

module.exports = app;
