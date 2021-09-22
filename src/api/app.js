const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const userMiddlewares = require('../middlewares/userMiddlewares');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', 
userMiddlewares.validateName,
userMiddlewares.validateEmail,
userController.create);

app.post('/login', userMiddlewares.validateLogin, userController.login);

module.exports = app;
