const Router = require('express').Router();
const Controller = require('../Controller');
const Middlewares = require('../Middlewares');

Router.post('/', Controller.users.register, Middlewares.error);

module.exports = Router;
