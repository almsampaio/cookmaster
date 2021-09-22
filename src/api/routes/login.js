const routes = require('express').Router();
const loginController = require('../controllers/login');

routes.post('/', loginController.login);

module.exports = routes;
