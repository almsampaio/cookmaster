const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('../controllers/user');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.addProduct);

app.post('/login', userController.login);

module.exports = app;
