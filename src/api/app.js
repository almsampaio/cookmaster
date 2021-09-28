const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('../routes/user');

app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser());
app.use('/users', usersRouter);

// Tratamento generico de error.
app.use((err, _req, res, _next) => res.status(err.status).json(err.error));

module.exports = app;
