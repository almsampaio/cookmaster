const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const recipeRouter = require('./routes/recipeRoutes');
const authController = require('./controllers/authController');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);
app.use('/recipes', recipeRouter);
app.post('/login', authController.login);

app.use(errorHandler);

module.exports = app;
