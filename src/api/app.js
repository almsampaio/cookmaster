const express = require('express');

const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();
const PATH = require('path');
const userRoute = require('../routes/user');
const loginRoute = require('../routes/login');
const recipesRoute = require('../routes/recipes');
const errorMiddleware = require('../middleware/error');

app.use(bodyParser);

const router = express.Router();

app.use(rescue(router));
router.use('/users', userRoute);
router.use('/login', loginRoute);
router.use('/recipes', recipesRoute);
router.use('/images', express.static(PATH.join('src/uploads')));

app.use(errorMiddleware);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});