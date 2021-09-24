// OBS: A camada Services será usada para validações de regras de negócios.
// Validações gerais sobre os dados do usuários serão validados nos Middlewares.

// Conectando a camada Services com a camada Models
const usuariosModel = require('../models/usuariosModel');

const cadastrarUsuario = async (name, email, password) => {
  const cadastrar = await usuariosModel.cadastrarUsuario(name, email, password);
  return cadastrar;
};

module.exports = {
  cadastrarUsuario,
};
