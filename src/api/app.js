const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares/error');
const usersControllers = require('./controllers/users');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.post('/users', usersControllers.postUsers);
// app.use('/login', login);
// app.use('/recipes', recipes);
// app.use('/images', express.static('src/uploads/'));

app.use(middlewares);

module.exports = app;
