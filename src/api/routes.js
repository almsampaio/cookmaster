const { Router } = require('express');
const createUser = require('./controllers/usersController');
const login = require('./controllers/loginController');
const createRecipes = require('./controllers/recipesController');
const validateUser = require('./validations/userValidation');
const validateRecipes = require('./validations/recipesValidation');
const validateJWT = require('./auth/validateJWT');

const routes = Router();

routes.post('/users', validateUser, createUser);
routes.post('/login', login);
routes.post('/recipes', validateRecipes, validateJWT, createRecipes);

module.exports = routes;
