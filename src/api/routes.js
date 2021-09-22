const express = require('express');

const userController = require('./controllers/userController');
const recipesController = require('./controllers/recipesController');
const { userCreateValidations, loginValidations } = require('./middlewares/userValidations');
const recipesValidation = require('./middlewares/recipesValidations');
const tokenValidation = require('./middlewares/tokenValidations');

const routes = express.Router();

routes.post('/users', userCreateValidations, userController.create);

routes.post('/login', loginValidations, userController.login);

routes.post('/recipes', tokenValidation, recipesValidation, recipesController.create);

routes.get('/recipes', recipesController.index);

module.exports = routes;