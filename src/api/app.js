const express = require('express');
const bodyParser = require('body-parser');
const { validateUsers } = require('../Services/usersService');
const { validateLogin } = require('../Services/loginService');
// const { validateToken } = require('../middlewares/Jwt');
const usersController = require('../Controllers/usersController');
const loginController = require('../Controllers/loginController');

const app = express();
app.use(bodyParser.json());

app.post('/users', validateUsers, usersController.create);
app.post('/login', validateLogin, loginController.login);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('teste');
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
