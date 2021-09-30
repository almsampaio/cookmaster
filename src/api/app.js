const express = require('express');
const bodyParser = require('body-parser');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateLogin } = require('../middlewares/userValidations');
const Users = require('../controllers/Users');
const userRouter = require('../routes/Users');
const recipesRouter = require('../routes/Recipes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);

app.post('/login', validateLogin, Users.login);

app.use('/recipes', validateJWT, recipesRouter);

module.exports = app;
