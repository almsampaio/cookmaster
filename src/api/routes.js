const { Router } = require('express');
const createUser = require('./controllers/usersController');
const login = require('./controllers/loginController');
const validateUser = require('./validations/userValidation');

const routes = Router();

routes.post('/login', login);
routes.post('/users', validateUser, createUser);

module.exports = routes;
