const express = require('express');
const bodyParser = require('body-parser');
const usersControllers = require('./controllers/usersControllers');
const recipesControllers = require('./controllers/recipesControllers');
const valideUser = require('./middlewares/usersValidations');
const valideRecipe = require('./middlewares/recipesValidations');
const tokenValidation = require('./middlewares/tokenValidation');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', valideUser.usersVAlidations, valideUser.emailExists, usersControllers.create);
app.post('/login', valideUser.loginValitation, valideUser.checkUser, usersControllers.login);

app.post('/recipes', tokenValidation, valideRecipe.usersVAlidations, recipesControllers.create);
app.get('/recipes', recipesControllers.get);

module.exports = app;
