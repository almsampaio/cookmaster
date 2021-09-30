const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesControllers');
const userValidations = require('../middlewares/userValidations');
const loginValidations = require('../middlewares/loginValidations');
const recipesValidations = require('../middlewares/recipesValidations');
const token = require('../middlewares/token');

const app = express();
app.use(bodyParser.json());

app.post('/users', 
  userValidations.validateName, 
  userValidations.validateEmail,
  userValidations.validatePassword, 
  userController.create);

app.post('/login',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  loginController.login);

app.post('/recipes',
  recipesValidations.validateName,
  recipesValidations.validateIngredients,
  recipesValidations.validatePreparation,
  token.validateToken,
  recipesController.create);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
