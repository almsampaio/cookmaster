const express = require('express');
const bodyParser = require('body-parser');
const { join } = require('path');

const errorMiddleware = require('../middlewares/error');
const userControllers = require('../controllers/user');
const recipeControllers = require('../controllers/recipes');
const validateJWT = require('./auth/validateJWT');
const uploadImg = require('../middlewares/uploadImg');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userControllers.registerUser);
app.post('/login', userControllers.login);

app.post('/recipes', validateJWT, recipeControllers.registerRecipe);
app.get('/recipes', recipeControllers.listRecipes);
app.get('/recipes/:id', recipeControllers.listRecipeById);
app.put('/recipes/:id', validateJWT, recipeControllers.editRecipe);
app.delete('/recipes/:id', validateJWT, recipeControllers.deleteRecipe);
app.put('/recipes/:id/image/',
validateJWT, uploadImg.upload.single('image'), recipeControllers.addImg);

app.use('/images', express.static(join(__dirname, '..', 'uploads')));

app.use(errorMiddleware);

module.exports = app;
