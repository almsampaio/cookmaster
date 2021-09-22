const express = require('express');
const bodyParse = require('body-parser');
const controllerUsers = require('./controller/users');
const ver = require('./service/users');

const app = express();

app.use(bodyParse.json());

app.post('/test', async (req, res) => {
  const { email, name, password } = req.body;

  const f = await ver.addUser(name, password, email);

  res.status(200).json(f);
});

app.post('/users', controllerUsers.addUser);

app.post('/login', controllerUsers.findUser);

app.use((err, _req, res, _next) => {
  const { message, status } = err;
  res.status(status).json({ message });
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
