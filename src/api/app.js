const express = require('express');
const path = require('path');

const { createNewUser, userLogin } = require('./controllers/Users');
const { createNewRecipe,
        getAllRecipes,
        getRecipeById,
        updateRecipeById,
        deleteRecipe,
        updateRecipeWithImage,
      } = require('./controllers/Recipes');
const JWTValidator = require('./middlewares/JWTValidator');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.post('/users', createNewUser);
app.post('/login', userLogin);
app.post('/recipes', JWTValidator, createNewRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeById);
app.put('/recipes/:id', JWTValidator, updateRecipeById);
app.delete('/recipes/:id', JWTValidator, deleteRecipe);
app.put('/recipes/:id/image', JWTValidator, updateRecipeWithImage);

module.exports = app;
