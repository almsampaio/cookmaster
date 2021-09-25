// OBS: A camada Services será usada para validações de regras de negócios.
// Validações gerais sobre os dados da receita serão validados nos Middlewares.

// Conectando a camada Services com a camada Models
const receitasModel = require('../models/receitasModel');

const cadastrarUsuario = async (name, ingredients, preparation, userID) => {
  const cadastrar = await receitasModel.cadastrarUsuario(name, ingredients, preparation, userID);

  return cadastrar;
};

module.exports = {
  cadastrarUsuario,
};