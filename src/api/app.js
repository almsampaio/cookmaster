const express = require('express');
const { router } = require('./routes');

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use(router);

module.exports = app;
