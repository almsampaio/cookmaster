const express = require('express');
const path = require('path');
const usersRouter = require('./router/users');
const usersAdminRouter = require('./router/usersAdmin');
const loginRouter = require('./router/login');
const recipesRouter = require('./router/recipes');
const imageRouter = require('./router/image');

const app = express();
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', usersRouter);
app.use('/users', usersAdminRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/images', imageRouter);

module.exports = app;
