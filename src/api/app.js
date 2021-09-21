const express = require('express');
const bodyParse = require('body-parser');

const {
  createUser,
} = require('../controllers/user');

const {
  validateName,
  validateEmail,
  validatePassword,
} = require('../middlewares/user');

const app = express();

app.use(bodyParse.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('Ola');
});

// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', validateName, validatePassword, validateEmail, createUser);

module.exports = app;
