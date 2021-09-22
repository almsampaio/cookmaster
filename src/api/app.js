const express = require('express');
const bodyparser = require('body-parser');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const postRecipieController = require('../controllers/postRecipieController');
const authMiddleware = require('../middlewares/authMiddleware');
const getRecipieController = require('../controllers/getRecipeController');

const app = express();

app.use(bodyparser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController);
app.post('/login', loginController);
app.post('/recipes', authMiddleware, postRecipieController);
app.get('/recipes', getRecipieController.getAll);
app.get('/recipes/:id', getRecipieController.getById);
app.put('/recipes/:id', authMiddleware, getRecipieController.updateById);

module.exports = app;
