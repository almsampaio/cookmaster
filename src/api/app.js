const express = require('express');
const bodyParser = require('body-parser');
const { create } = require('./controllers/usersControllers');
const { usersVAlidations, emailExists } = require('./middlewares/usersValidations');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersVAlidations, emailExists, create);

module.exports = app;
