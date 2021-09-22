const express = require('express');
const bodyParser = require('body-parser');
const controllerUser = require('../controllers/users');
const controllerLogin = require('../controllers/login');
const valid = require('./validations/users');
const validUser = require('./validations/login');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', [
  valid.validateName, valid.validEmail, valid.validPassword, controllerUser.createUser,
]);

app.post('/login', [validUser.validEmail, validUser.validPassword, controllerLogin.login]);

module.exports = app;
