const express = require('express');
const bodyParser = require('body-parser');
const { validateLogin } = require('../middlewares/userValidations');
const Users = require('../controllers/Users');
const userRouter = require('../routes/Users');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);

app.post('/login', validateLogin, Users.login);

module.exports = app;
