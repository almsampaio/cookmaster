const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/users');
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
  valid.validateName, valid.validEmail, valid.validPassword, controller.createUser,
]);

app.post('/login', [validUser.validEmail, validUser.validPassword, controller.login]);

module.exports = app;
