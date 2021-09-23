const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const { validateJWT } = require('../auth/validateJWT');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUser);
app.post('/login', usersController.loginUser);
app.post('/recipes', validateJWT, recipesController.createRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);
app.put('/recipes/:id', validateJWT, recipesController.editRecipe);
app.delete('/recipes/:id', validateJWT, recipesController.deleteRecipe);
app.put(
  '/recipes/:id/image',
  validateJWT,
  recipesController.upload.single('image'),
  recipesController.addImage,
);

module.exports = app;
