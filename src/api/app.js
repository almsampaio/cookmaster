const express = require('express');
const bodyParser = require('body-parser');

const rescue = require('express-rescue');
const userController = require('../controllers/user');
const recipeController = require('../controllers/recipe');
const { verifyToken } = require('../service/token');

const app = express();

app.use(bodyParser.json());

app.post('/users', rescue(userController.newUser));
app.post('/login', rescue(userController.login));
app.get('/user', rescue(userController.getAll));
app.post('/recipes', rescue(verifyToken), rescue(recipeController.create));
app.get('/recipes/:id', rescue(recipeController.getOne));
app.get('/recipes', rescue(recipeController.getAll));
app.put('/recipes/:id', rescue(verifyToken), rescue(recipeController.editOne));
app.delete('/recipes/:id', rescue(verifyToken), rescue(recipeController.deleteOne));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.message) return res.status(err.status).json({ message: err.message });
  return res.status(500).json(err.message);
});

module.exports = app;
