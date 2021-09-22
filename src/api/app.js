const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { handleErrors } = require('../Middlewares/erros');
const { validateNewUser, validateLogin, validateNewRecipe } = require('../Middlewares/usersMid');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

const apiRoutes = express.Router();
apiRoutes.post('/users', validateNewUser, routes.createUser);
apiRoutes.post('/login', validateLogin, routes.login);
apiRoutes.post('/recipes', validateNewRecipe, routes.createRecipe);
apiRoutes.get('/recipes/:id', routes.getById);
apiRoutes.get('/recipes', routes.getAll);

app.use(apiRoutes);
app.use(handleErrors);

module.exports = app;

// FONTE: https://github.com/tryber/nodejs-jwt-base-project/blob/block-28-3/src/api/app.js
