const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const { create } = require('../controllers/users');
const { userLogin } = require('../controllers/login');
const { createRecepie, findRecepies, findRecepieById } = require('../controllers/recepie');
const { verifyName, verifyEmail, emailExists } = require('../middlewares/userValidation');
const { verifyEmailPass, emailValid, passwordValid } = require('../middlewares/loginValidations');
const { tokenValidation } = require('../middlewares/tokenValidations');
const verifyRecepie = require('../middlewares/recipieValidation');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

const userValid = [verifyName, verifyEmail, emailExists];
const loginValid = [verifyEmailPass, emailValid, passwordValid];
const recepieValid = [
  verifyRecepie.verifyName,
  verifyRecepie.verifyIngredients,
  verifyRecepie.verifyPreparation,
];

app.post('/users', ...userValid, create);

app.post('/login', ...loginValid, userLogin);

app.post('/recipes', ...recepieValid, tokenValidation, createRecepie);

app.get('recipes', findRecepies);

app.get('recipes', findRecepieById);

module.exports = app;
