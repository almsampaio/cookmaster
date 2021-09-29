const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const controllers = require('../controllers');
const { authMiddleware } = require('../middlewares/jwtAuthMiddleware');
const { errorMiddleware } = require('../middlewares/errorMiddleware');

const app = express();

app.use(bodyParser.json());

app.post('/users', rescue(controllers.registerUser));
app.post('/login', rescue(controllers.logUserIn));

app.post('/recipes', authMiddleware, rescue(controllers.createRecipe));

app.use(errorMiddleware);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send('Hello my baby, hello my honey ...');
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
