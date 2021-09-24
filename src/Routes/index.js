const express = require('express');

const Router = express.Router();

const UserRoutes = require('./Users');

Router.use('/users', UserRoutes);

Router.get('/', (_request, response) => {
  response.send();
});

module.exports = Router;
