const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const { create } = require('../controllers/users');

const { 
  nameValidation, 
  emailValidation, 
  emailExists,
} = require('../middlewares/validationUser');

const { 
  emailRequired, 
  passwordRequired, 
  emailValid, 
  passwordValid,
} = require('../middlewares/validationLogin');

const { userLogin } = require('../controllers/login');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.post('/users', nameValidation, emailValidation, emailExists, create);
app.post('/login', emailRequired, passwordRequired, emailValid, passwordValid, userLogin);

module.exports = app;
