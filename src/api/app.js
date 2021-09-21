const bodyParser = require('body-parser');
const express = require('express');

const usersController = require('../controllers/users');
const loginController = require('../controllers/login');
const errors = require('../middlewares/errors');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.route('/users')
  .post(usersController.registerUser);

app.route('/login')
  .post(loginController.login);

app.use(errors);

module.exports = app;
