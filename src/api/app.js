const express = require('express');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => res.send());
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
