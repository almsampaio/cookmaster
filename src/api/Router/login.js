const Router = require('express').Router();
const Controller = require('../Controller');
const Middlewares = require('../Middlewares');

Router.post('/', Controller.login.logIN, Middlewares.generateJWT, Middlewares.error);

module.exports = Router;
