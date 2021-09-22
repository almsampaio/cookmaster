const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const RecipeController = require('../controllers/RecipeController');
const authMiddleware = require('../middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users/', UserController.create);
app.post('/login', LoginController.login);
app.post('/recipes', authMiddleware.authLogin, RecipeController.create);

module.exports = app;
