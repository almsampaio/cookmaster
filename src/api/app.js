const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Importar validações
const dadosUsuario = require('../middlewares/validarDadosUsuario');
const dadosLogin = require('../middlewares/validarLogin');
const dadosReceita = require('../middlewares/validarReceita');
const dadosToken = require('../middlewares/token');

// Importar camadas
const usuariosController = require('../controllers/usuariosController');
const loginController = require('../controllers/loginController');
const receitasController = require('../controllers/receitasController');

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

app.post('/recipes',
dadosReceita.verificarNome,
dadosReceita.verificarIngrediente,
dadosReceita.verificarModoDePreparo,
dadosToken.validarToken,
receitasController.cadastrarReceita);

app.get('/recipes', receitasController.listarReceitas);

// Fim das rotas

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
