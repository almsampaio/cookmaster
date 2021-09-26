const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const userData = require('../middlewares/userValidations');
const loginData = require('../middlewares/loginValidations');
const recipesData = require('../middlewares/recepiesValidations');
const token = require('../middlewares/token');

const usersControllers = require('../controllers/usersControllers');
const loginControllers = require('../controllers/loginControllers');
const recepiesControllers = require('../controllers/recepiesControllers');

app.post('/users',
userData.nameVerify,
userData.emailVerify,
userData.emailVerifyExists,
usersControllers.createUser);

app.post('/login',
loginData.emailVerify,
loginData.passwordVerify,
loginData.emailVerifyValid,
loginData.passwordVerifyValid,
loginControllers.userLogin);

app.post('/recipes',
recipesData.nameVerify,
recipesData.ingredientsVerify,
recipesData.preparationVerify,
token.tokenValidation,
recepiesControllers.createRecepie);

app.get('/recipes', recepiesControllers.showRecipes);
app.get('/recipes/:id', recepiesControllers.showRecipesByID);

app.put('/recipes/:id',
token.tokenValidation,
recepiesControllers.updateRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
