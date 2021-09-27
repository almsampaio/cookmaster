const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const { create } = require('../controllers/users');
const { userLogin } = require('../controllers/login');
const { verifyName, verifyEmail, emailExists } = require('../middlewares/userValidation');
const { verifyEmailPass, emailValid, passwordValid } = require('../middlewares/loginValidations');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const userValid = [verifyName, verifyEmail, emailExists];
const loginValid = [verifyEmailPass, emailValid, passwordValid];

app.post('/users', ...userValid, create);

app.post('/login', ...loginValid, userLogin);

module.exports = app;
