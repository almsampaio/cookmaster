const path = require('path');
const express = require('../utils/express-rest');
const { usersController } = require('../controllers');
const { loginController } = require('../controllers');
const { recipesController } = require('../controllers');

const routes = express.Router();

routes.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador
routes.get('/', (_req, res) => {
  res.send('Hi');
});
// Não remover esse end-point, ele é necessário para o avaliador
routes.post('/users', usersController.create);
routes.post('/login', loginController.login);
routes.post('/recipes', recipesController.create);

module.exports = routes;
