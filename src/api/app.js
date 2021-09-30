const bodyParser = require('body-parser');
const express = require('express');
const Users = require('../controllers/userController');
const userValidation = require('../middlewares/uservalidation');
const loginValidation = require('../middlewares/loginValidation');
const Login = require('../controllers/loginController');
const { tokenValidation } = require('../middlewares/tokenValidation');
const Recipes = require('../middlewares/recipeValidation');
const createRecipe = require('../controllers/recipeControler');

const app = express();

app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', 
userValidation.emailExists, 
userValidation.emailValidation, 
userValidation.nameValidation, 
Users.createUser);

app.post('/login', 
loginValidation.emailRequired, 
loginValidation.passwordRequired, 
loginValidation.emailValid, 
loginValidation.passwordValid, 
Login.userLogin);

app.post('/recipes', 
Recipes.verifyName, 
Recipes.verifyIngredients, 
Recipes.verifyPreparation, 
tokenValidation, 
createRecipe.addRecipes);

app.get('/recipes', createRecipe.findRecipes);
app.get('/recipes/:id', createRecipe.findRecipeById);
app.put('/recipes/:id', tokenValidation, createRecipe.editRecipe);

module.exports = app;
