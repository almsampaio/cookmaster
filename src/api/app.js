const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const users = require('../middlewares/userValidation');

const usersControllers = require('../controllers/userController');

app.post('/users',
users.nameValidate,
users.emailValidate,
users.emailExists,
usersControllers.create);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// ...

module.exports = app;
