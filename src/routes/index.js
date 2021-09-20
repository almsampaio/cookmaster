const path = require('path');
const express = require('../utils/express-rest');

const routes = express.Router();

routes.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador
routes.get('/', (_req, res) => {
  res.send('Hi');
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = routes;
