// OBS: Decidi ligar a camada Controllers direto com a camada Models, onde
// vou gerar o Token, porque não vi nenhum sentido passar pela camada Services.

// Conectando a camada Controllers com a camada Model
const loginModel = require('../models/loginModel');

const loginUsuario = async (req, res) => {
  const { email } = req.body;
  
  const login = await loginModel.loginUsuario(email);
  return res.status(200).json(login);
};

module.exports = {
  loginUsuario,
};