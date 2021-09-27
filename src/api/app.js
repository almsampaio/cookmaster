const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const { create } = require('../controllers/users');
const { verifyName, verifyEmail, emailExists } = require('../middlewares/userValidation');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const userValid = [verifyName, verifyEmail, emailExists];

app.post('/users', ...userValid, create);

app.post('login');

module.exports = app;
