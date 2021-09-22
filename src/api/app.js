const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersRoutes = require('../routes/users');
const errors = require('../middlewares/error');
const loginRoutes = require('../routes/login');
const recipesRoutes = require('../routes/recipes');
const imagesRoutes = require('../routes/images');

const app = express();

app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/recipes', recipesRoutes);

// Source https://stackoverflow.com/questions/28143419/express-static-keeps-routing-my-files-from-the-route
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/images', imagesRoutes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});

app.use(errors);

module.exports = app;