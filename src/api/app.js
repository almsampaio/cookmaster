const express = require('express');
const bodyParser = require('body-parser');

const rescue = require('express-rescue');
const userController = require('../controllers/user');

const app = express();

app.use(bodyParser.json());

app.post('/users', rescue(userController.newUser));
app.post('/login', rescue(userController.login));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use((err, _req, res, _next) => {
  if (err.message) return res.status(err.status).json({ message: err.message });
  return res.status(500).json(err.message);
});

module.exports = app;
