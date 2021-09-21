const bodyParser = require('body-parser');
const express = require('express');
const {
  validateUser,
  validateLoginFields,
  validateRecipe,
} = require('../midlewares');
const {
  insertUserController,
  loginController,
  insertRecipe,
} = require('../controlers');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users/', validateUser, insertUserController);

app.post('/login/', validateLoginFields, loginController);

app.post('/recipes', validateRecipe, insertRecipe);

module.exports = app;
