const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const userValidate = require('../middlewares/userValidate');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', 
userValidate.validateName,
userValidate.validateEmail,
userController.create);

module.exports = app;
