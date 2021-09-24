const express = require('express');
const bodyparser = require('body-parser');

const UserController = require('../controllers/userController');
const Login = require('../controllers/login');

const app = express();

app.use(bodyparser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
  response.json({message: 'ff'})
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UserController.create);
app.post('/login', Login);

module.exports = app;
