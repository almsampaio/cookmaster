const express = require('express');

const Router = express.Router();

const UserRoutes = require('./Users');
const LoginRoutes = require('./Login');

Router.use('/users', UserRoutes);
Router.use('/login', LoginRoutes);

Router.get('/', (_request, response) => {
  response.send();
});

module.exports = Router;
