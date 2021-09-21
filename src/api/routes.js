const express = require('express');

const userController = require('./controllers/userController');
const userCreateValidations = require('./middlewares/userValidations');

const routes = express.Router();

routes.post('/users', userCreateValidations, userController.create);

module.exports = routes;