const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
  userRouter,
  loginRouter,
  recipesRouter,
  imagesRouter,
} = require('./routes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.static(path.join(__dirname, '..', '/uploads')));

// Manipulação de usuários
app.use('/users', userRouter);
app.use('/login', loginRouter);

// Manipulação de receitas
app.use('/recipes', recipesRouter);

app.use('/images', imagesRouter);

module.exports = app;
