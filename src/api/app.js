const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controller/userControlle');
const middleware = require('../middleware/middleware');

const util = require('../util/util');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Users
app.post('/users', middleware.isValidEmail, userController.addUser);
app.get('/users', userController.findAll);

// login
app.post('/login', userController.login);

// recipes
app.post('/recipes', middleware.authToken, userController.addRecipes);
app.get('/recipes/:id', userController.findByIdRecipes);
app.get('/recipes', userController.findAllRecipes);
app.put('/recipes/:id', middleware.authToken, userController.upDateRecipes);
app.delete('/recipes/:id', middleware.authToken, userController.excludeRecipes);
app.put('/recipes/:id/image', util.upload.single('image'),
  middleware.authToken, userController.upLoadFile);

module.exports = app;
