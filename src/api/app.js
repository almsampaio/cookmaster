const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers/usersController');

const app = express();
app.use(bodyParser.json());

app.post('/users', controllers.create);

app.post('/login', controllers.findUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
