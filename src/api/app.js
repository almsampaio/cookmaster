const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controller/userController');
const { validationCreateUser, validationLoginUser } = require('../middlewares/validateUser');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', validationCreateUser, userController.create);
app.post('/login', validationLoginUser, userController.login);

module.exports = app;
