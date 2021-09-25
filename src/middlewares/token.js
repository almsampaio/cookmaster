const jwt = require('jsonwebtoken');
require('dotenv').config();

const senha = 'ProjetoDoBloco28';

// Conectando o token.js com a camada Models
const usuariosModel = require('../models/usuariosModel');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const novoToken = (dadosUsuario) => {
  const usuariotoken = jwt.sign(dadosUsuario, senha, jwtConfig);
  return usuariotoken;  
};

const validarToken = async (req, res, next) => {
  const usuarioToken = req.headers.authorization;
  if (!usuarioToken) {
    res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(usuarioToken, senha);

    const verificaUsuario = await usuariosModel.buscarPeloEmail(payload.email);
    if (!verificaUsuario || verificaUsuario === undefined) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    const { password, ...tokenSemPassword } = verificaUsuario;

    const { _id } = tokenSemPassword;
    req.user = _id;

    next();
} catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  novoToken,
  validarToken,
};