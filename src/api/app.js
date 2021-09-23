require('dotenv/config');
const bodyParser = require('body-parser');
const express = require('express');
const UserController = require('../controllers/UserController');
const errorMiddleware = require('../middlewares/error');

const app = express();
app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.post('/users', UserController.create);
app.post('/login', UserController.userLogin);

app.use(errorMiddleware);
module.exports = app;
