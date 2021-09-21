const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middlewares/error');
const userControllers = require('../controllers/user');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userControllers.registerUser);

app.use(errorMiddleware);

module.exports = app;
