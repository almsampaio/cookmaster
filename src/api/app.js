const express = require('express');
const bodyParser = require('body-parser');

const usersControllers = require('../controllers/usersControllers');
const validateJWT = require('../middlewares/validateJWT');
const recipesControllers = require('../controllers/recipesControllers');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersControllers.create);
app.post('/login', usersControllers.login);
app.post('/recipes', validateJWT, recipesControllers.create);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
