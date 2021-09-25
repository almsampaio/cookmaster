const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const userData = require('../middlewares/userValidations');
const loginData = require('../middlewares/loginValidations');

const usersControllers = require('../controllers/usersControllers');
const loginControllers = require('../controllers/loginControllers');

app.post('/users',
userData.nameVerify,
userData.emailVerify,
userData.emailVerifyExists,
usersControllers.createUser);

app.post('/login',
loginData.emailVerify,
loginData.passwordVerify,
loginData.emailVerifyValid,
loginData.passwordVerifyValid,
loginControllers.userLogin);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
