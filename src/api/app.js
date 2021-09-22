const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./controllers/UsersController');

const validateUsers = require('./middlewares/UsersValidation');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', validateUsers.validateFields, usersController.createUser);
app.post('/login', usersController.findByCredentials);
module.exports = app;
