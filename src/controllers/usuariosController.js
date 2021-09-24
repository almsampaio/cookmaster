// Conectando a camada Controllers com a camada Services
const usuariosService = require('../services/usuariosService');

const cadastrarUsuario = async (req, res) => {
  const { name, email, password } = req.body;
  
  const cadastrar = await usuariosService.cadastrarUsuario(name, email, password);
  return res.status(201).json(cadastrar);
};

module.exports = {
  cadastrarUsuario,
};