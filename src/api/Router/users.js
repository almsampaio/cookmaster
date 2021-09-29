const Router = require('express').Router();
const Controller = require('../Controller');

Router.post('/', Controller.users.register);

module.exports = Router;
