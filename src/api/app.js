  const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const authToken = require('./middlewares/authMiddleware');
const adminToken = require('./middlewares/authMiddlewareAdmin');
const recipesController = require('./controllers/recipesController');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.post('/users', userController.register);
app.post('/login', loginController.login);
app.post('/recipes', authToken, recipesController.register);
app.get('/recipes', recipesController.getAll);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', adminToken, recipesController.update);
app.delete('/recipes/:id', adminToken, recipesController.remove);

module.exports = app;
