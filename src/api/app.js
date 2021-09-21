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
app.put('/recipes/:id', Wares.authToken, Recipes.update);
app.delete('/recipes/:id', Wares.authToken, Recipes.remove);
app.put('/recipes/:id/image', Wares.authToken, Wares.upload.single('image'), Recipes.updateFile);
app.use('/images', express.static('src/uploads/'));

module.exports = app;
