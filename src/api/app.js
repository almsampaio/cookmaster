const bodyParser = require('body-parser');
const express = require('express');

const usersController = require('../controllers/users');
const errors = require('../middlewares/errors');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.route('/users')
  .post(usersController.registerUser);

app.use(errors);

module.exports = app;
