const express = require('express');
const bodyParser = require('body-parser');
const routerRecipes = require('../routes/recipes');
const routerUsers = require('../routes/users');
const routerLogin = require('../routes/login');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

// Users
app.use('/users', routerUsers);

// Login
app.use('/login', routerLogin);

// Recipes
app.use('/recipes', routerRecipes);

// Arquivos staticos
app.use('/images', express.static('src/uploads/'));

module.exports = app;
