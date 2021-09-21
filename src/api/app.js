const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/users', userController.create);
app.post('/login', userController.findByCredentials);

module.exports = app;