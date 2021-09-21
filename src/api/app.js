const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../controllers/users');
const Wares = require('../middlewares');
const Recipes = require('../controllers/recipes');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

// Users
app.post('/users', Users.create);

// Login
app.post('/login', Users.generetorToken);

// Recipes
app.post('/recipes', Wares.authToken, Recipes.create);
app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.getById);

module.exports = app;
