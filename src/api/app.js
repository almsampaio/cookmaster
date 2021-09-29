const express = require('express');
const bodyParser = require('body-parser');

const router = require('../routes/routes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  res.status(500).json({ message: `Internal Error: ${err.message}` });
});

module.exports = app;