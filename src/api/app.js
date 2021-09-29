const bodyParser = require('body-parser');
const express = require('express');
const Users = require('../controllers/userController');
const userValidation = require('../middlewares/uservalidation');

const app = express();

app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', 
userValidation.emailExists, 
userValidation.emailValidation, 
userValidation.nameValidation, 
Users.createUser);

module.exports = app;
