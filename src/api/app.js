const express = require('express');
const bodyParser = require('body-parser');

const routes = require('../routes');
const { errorMiddleware } = require('../middlewares');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);

module.exports = app;
