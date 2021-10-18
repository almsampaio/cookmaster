const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersRouter = require('./router/users/usersRouter');
const usersAdminRouter = require('./router/users/usersAdminRouter');
const loginRouter = require('./router/users/loginRouter');
const recipesRouter = require('./router/recipes/recipesRouter');
const imageRouter = require('./router/images/imageRouter');

const app = express();
app.use(bodyParser.json());

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
