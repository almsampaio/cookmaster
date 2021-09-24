const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Importar validações
const dadosUsuario = require('../middlewares/validarDadosUsuario');

// Importar camadas
const usuariosControllers = require('../controllers/usuariosControllers');

// Início das rotas
app.post('/users',
dadosUsuario.verificarNome,
dadosUsuario.verificarEmail,
dadosUsuario.verificarEmailExiste,
usuariosControllers.cadastrarUsuario);

// Fim das rotas

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
