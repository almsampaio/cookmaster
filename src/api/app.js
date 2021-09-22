const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const recipeMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/users', userController.create);
app.post('/login', userController.findByCredentials);

app.post('/recipes', recipeMiddleware.validateJWT, recipeController.create);
app.get('/recipes', recipeController.getAll);
app.get('/recipes/:id', recipeController.getById);

module.exports = app;