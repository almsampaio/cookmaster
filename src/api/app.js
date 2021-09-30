const bodyParser = require('body-parser');
const express = require('express');
const Users = require('../controllers/userController');
const userValidation = require('../middlewares/uservalidation');
// const tokenValidation = require('../middlewares/tokenValidation');
const loginValidation = require('../middlewares/loginValidation');
const Login = require('../controllers/loginController');

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

app.post('/login', 
loginValidation.emailRequired, 
loginValidation.passwordRequired, 
loginValidation.emailValid, 
loginValidation.passwordValid, 
Login.userLogin);

module.exports = app;
