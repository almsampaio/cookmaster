const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const multerFile = require('../middlewares/multer');

const usersControllers = require('../controllers/users');
const recipesControllers = require('../controllers/recipes');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'uploads')));

app.use(bodyParse.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersControllers.createUser);

app.post('/login', usersControllers.loginUser);

app.post('/recipes', recipesControllers.createRecipes);

app.get('/recipes', recipesControllers.getRecipes);

app.get('/recipes/:id', recipesControllers.getRecipesById);

app.put('/recipes/:id', recipesControllers.updateRecipe);

app.put('/recipes/:id/image', multerFile.upload.single('image'), 
  recipesControllers.addRecipeImage);

app.delete('/recipes/:id', recipesControllers.removeRecipe);

module.exports = app;
