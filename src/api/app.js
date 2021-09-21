const app = require('express')();
const bodyParser = require('body-parser');
const userRouter = require('../routers/userRouter');
// const loginRouter = require('../routers/loginRouter');

// const path = require('path');

app.use(bodyParser.json());

app.use('/users', userRouter);
// app.use('/login', loginRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
