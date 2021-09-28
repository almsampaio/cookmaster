require('dotenv/config');
const bodyParser = require('body-parser');
const express = require('express');
const UserController = require('../controllers/UserController');
const RecipeController = require('../controllers/RecipeController');
const errorMiddleware = require('../middlewares/error');
const { tokenValidation } = require('../middlewares/tokenValidation');

const app = express();

app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UserController.create);
app.post('/login', UserController.userLogin);

app.post('/recipes', tokenValidation, RecipeController.create);
app.get('/recipes', RecipeController.getAll);
app.get('/recipes/:id', RecipeController.getById);
app.put('/recipes/:id', tokenValidation, RecipeController.update);
app.delete('/recipes/:id', tokenValidation, RecipeController.deleteRecipe);

app.use(errorMiddleware);
module.exports = app;
