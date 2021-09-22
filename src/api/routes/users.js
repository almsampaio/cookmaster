const routes = require('express').Router();
const usersController = require('../controllers/users');

routes.post('/', usersController.create);

module.exports = routes;
