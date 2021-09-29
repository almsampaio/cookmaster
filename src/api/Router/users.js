const Router = require('express').Router();

Router.post('/', (_req, res) => res.send('From router'));

module.exports = Router;
