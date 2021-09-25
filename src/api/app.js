const express = require('express');

const { createNewUser, userLogin } = require('./controllers/Users');
const { createNewRecipe, getAllRecipes, getRecipeById } = require('./controllers/Recipes');
const JWTValidator = require('./middlewares/JWTValidator');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.json());
app.post('/users', createNewUser);
app.post('/login', userLogin);
app.post('/recipes', JWTValidator, createNewRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeById);

module.exports = app;
