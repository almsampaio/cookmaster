// Conectando a camada Controllers com a camada Services
const receitasService = require('../services/receitasService');

const cadastrarReceita = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const userID = req.user;
  const cadastrar = await receitasService
  .cadastrarUsuario(name, ingredients, preparation, userID);

  return res.status(201).json(cadastrar);
};

module.exports = {
  cadastrarReceita,
};