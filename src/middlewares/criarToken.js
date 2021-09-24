const jwt = require('jsonwebtoken');
require('dotenv').config();

const SENHA = 'ProjetoDoBloco28';

const JWT = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const novoToken = (dadosUsuario) => {
  const token = jwt.sign({ dadosUsuario }, SENHA, JWT);
  return token;
};

module.exports = {
  novoToken,
};