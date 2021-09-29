const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/userController');
const validations = require('../middlewares/validations');

const app = express();
app.use(bodyParser.json());

app.post('/users', 
  validations.validateName, 
  validations.validateEmail,
  validations.validatePassword, 
  userController.create);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
