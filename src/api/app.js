const express = require('express');

const Router = require('./Router');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => res.send());
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/ping', (_req, res) => res.status(200).json({ message: 'ok' }));

app.use('/users', Router.users);

module.exports = app;
