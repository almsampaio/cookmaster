const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Router = require('./Router');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => res.send());
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/ping', (_req, res) => res.status(200).json({ message: 'ok' }));

app.use('/users', Router.users);
app.use('/login', Router.login);
app.use('/recipes', Router.recipes);

module.exports = app;
