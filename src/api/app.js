const express = require('express');
const jwt = require('jsonwebtoken');

const multer = require('multer');

const userController = require('../../controllers/userController');


const app = express();

app.post('/users', userController.registerUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
