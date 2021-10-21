const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('../routes/usersRoutes');
const loginRoutes = require('../routes/loginRoutes');
const recipesRoutes = require('../routes/recipesRoutes');

const app = express();
app.use(bodyParser());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/recipes', recipesRoutes);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: err.message });
});

module.exports = app;
