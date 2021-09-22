const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const storage = require('./storage');
const {
  validateUser,
  validateLoginFields,
  validateRecipe,
  validateAuthetication,
} = require('../midlewares');
const {
  insertUserController,
  loginController,
  insertRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
} = require('../controlers');

const app = express();

const upload = multer({ storage });

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users/', validateUser, insertUserController);

app.post('/login/', validateLoginFields, loginController);

app.post('/recipes', validateRecipe, insertRecipe);

app.get('/recipes/', getAllRecipes);

app.get('/recipes/:id', getRecipeById);

app.put('/recipes/:id/image', validateAuthetication, upload.single('image'), insertImage);

app.put('/recipes/:id', validateAuthetication, updateRecipe);

app.delete('/recipes/:id', validateAuthetication, deleteRecipe);

module.exports = app;
