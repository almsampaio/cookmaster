const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const usersRouter = require('../routes/user');
const loginRouter = require('../routes/login');
const recipesRouter = require('../routes/recipes');

app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser());
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
// Tratamento generico de error.
app.use((err, _req, res, _next) => res.status(err.status).json(err.error));

module.exports = app;
