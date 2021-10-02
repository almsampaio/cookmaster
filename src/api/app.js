const express = require('express');
const dotenv = require('dotenv');
const { router } = require('./routes');

const app = express();
app.use(express.json());
dotenv.config();

app.get('/', (request, response) => {
  response.send();
});

app.use(router);

module.exports = app;
