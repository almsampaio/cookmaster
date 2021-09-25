const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const userData = require('../middlewares/userValidations');

const usersControllers = require('../controllers/usersControllers');

app.post('/users',
userData.nameVerify,
userData.emailVerify,
userData.emailVerifyExists,
usersControllers.createUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
