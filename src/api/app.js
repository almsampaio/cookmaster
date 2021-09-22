const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const error = require('./middlewares/error');

const app = express();
require('dotenv').config();

app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));
app.use(bodyParser.json());
// const createUser = require('./controllers/usersController');

// const userRoutes = express.Router();
// const validateJWT = require('./auth/validateJWT');

// userRoutes.post('/', createUser);
// apiRoutes.get('/recipes', validateJWT, routes.getPosts);

app.use('/', routes, error);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
