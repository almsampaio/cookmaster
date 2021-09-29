const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const users = require('../middlewares/userValidation');
const login = require('../middlewares/loginValidation');
const recipes = require('../middlewares/recipesValidation');
const token = require('../middlewares/token');
const usersControllers = require('../controllers/userController');
const loginControllers = require('../controllers/loginController');
const recipesControllers = require('../controllers/recipesControllers');

app.post('/users',
users.nameValidate,
users.emailValidate,
users.emailExists,
usersControllers.create);

app.post('/login',
login.emailValidate,
login.passwordValidate,
login.emailVerifyValidate,
login.passwordVerifyValidate,
loginControllers.userLogin);

app.post('/recipes',
recipes.nameValidate,
recipes.ingredientsValidate,
recipes.preparationValidate,
token.tokenValidate,
recipesControllers.createRecipe);

app.get('/recipes', recipesControllers.getRecipes);

app.get('/recipes/:id', recipesControllers.getRecipeById);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// ...

module.exports = app;
