const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersController = require('../controllers/users');
const loginController = require('../controllers/login');
const recipesController = require('../controllers/recipes');
const upload = require('../utils/recipesMulter');
const { validateJWT } = require('../middlewares/validateJWT');

const app = express();

app.use(bodyParser.json());
app.use('/image', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.createUser);
app.post('/login', loginController.loginUser);
app.post('/recipes', validateJWT, recipesController.createRecipes);
app.get('/recipes', recipesController.getRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);
app.put('/recipes/:id', validateJWT, recipesController.updateRecipe);
app.delete('/recipes/:id', validateJWT, recipesController.deleteRecipe);
app.put('/recipes/:id/image/', validateJWT, upload.single('image'), recipesController.insertImage);

module.exports = app;
