const express = require('express');

const userController = require('./controllers/userController');
const { userCreateValidations, loginValidations } = require('./middlewares/userValidations');

const routes = express.Router();

routes.post('/users', userCreateValidations, userController.create);

routes.post('/login', loginValidations, userController.login);

module.exports = routes;