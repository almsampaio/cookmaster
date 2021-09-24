const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Importar validações
const dadosUsuario = require('../middlewares/validarDadosUsuario');
const dadosLogin = require('../middlewares/validarLogin');

// Importar camadas
const usuariosController = require('../controllers/usuariosController');
const loginController = require('../controllers/loginController');

// Início das rotas
app.post('/users',
dadosUsuario.verificarNome,
dadosUsuario.verificarEmail,
dadosUsuario.verificarEmailExiste,
usuariosController.cadastrarUsuario);

app.post('/login',
dadosLogin.verificarEmail,
dadosLogin.verificarSenha,
dadosLogin.verificarEmailValido,
dadosLogin.verificarSenhaValida,
loginController.loginUsuario);

// Fim das rotas

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
