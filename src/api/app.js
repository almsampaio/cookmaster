const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const validations = require('../middlewares/validations');
const loginValidations = require('../middlewares/loginValidations');

const app = express();
app.use(bodyParser.json());

app.post('/users', 
  validations.validateName, 
  validations.validateEmail,
  validations.validatePassword, 
  userController.create);

app.post('/login',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  loginController.login);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
