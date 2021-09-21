const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../controllers/users');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

// Users
app.post('/users', Users.create);

module.exports = app;
