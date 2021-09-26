const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('./controllers/userController');
const validUsers = require('./middlewares/userMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', validUsers.validateFields, usersController.createUser);
app.post('/login', usersController.findByPersonalData);

module.exports = app;
