const express = require('express');
const bodyParser = require('body-parser');
const { create, login } = require('./controllers/usersControllers');
const {
  usersVAlidations,
  emailExists,
  loginValitation,
  checkUser,
} = require('./middlewares/usersValidations');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersVAlidations, emailExists, create);
app.post('/login', loginValitation, checkUser, login);

module.exports = app;
