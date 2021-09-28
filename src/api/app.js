const express = require('express');

const app = express();
const userRouter = require('../routes/userRoutes');
const loginRouter = require('../routes/loginRoutes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);
app.use('/login', loginRouter);

module.exports = app;
