const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');
const upload = require('../middlewares/upload');
const {
  validationCreateUser,
  validationLoginUser } = require('../middlewares/validateUser');
const {
  validationCreateRecipe,
  validationtoken } = require('../middlewares/validateRecipes');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

//  USER

app.post('/users', validationCreateUser, userController.create);
app.post('/login', validationLoginUser, userController.login);

// ______________________________________________________________ //

// RECIPES

app.post('/recipes', validationCreateRecipe, validationtoken, recipeController.create);
app.get('/recipes', recipeController.getAll);
app.get('/recipes/:id', recipeController.getById);
app.put('/recipes/:id', validationtoken, recipeController.update);
app.delete('/recipes/:id', validationtoken, recipeController.exclude);
app
  .put('/recipes/:id/image', validationtoken, upload.single('image'), recipeController.uploadImage);

// ______________________________________________________________ //

// IMAGES

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
