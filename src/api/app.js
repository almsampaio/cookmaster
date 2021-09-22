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

app.use(authenticate);

app.route('/recipes')
  .post(recipesController.createRecipe);

app.use(errors);

module.exports = app;
