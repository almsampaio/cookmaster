const path = require('path');
const express = require('../utils/express-rest');
const { usersController } = require('../controllers');
const { loginController } = require('../controllers');
const { recipesController } = require('../controllers');

const routes = express.Router();

routes.post('/users', usersController.create);
routes.post('/login', loginController.login);
routes.post('/recipes', recipesController.create);
routes.get('/recipes', recipesController.readMany);
routes.get('/recipes/:id', recipesController.readOne);
routes.put('/recipes/:id', recipesController.update);
routes.delete('/recipes/:id', recipesController.delete);
// Não remover esse end-point, ele é necessário para o avaliador
routes.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador
routes.get('/', (_req, res) => res.send());

module.exports = routes;
