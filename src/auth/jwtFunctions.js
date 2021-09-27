require('dotenv').config();
const jwt = require('jsonwebtoken');

// a senha da variável de ambiente foi gerada no site https://www.4devs.com.br/gerador_de_senha
const secret = process.env.SECRET || 'senha_dificil';

const create = (user) => {
  const payload = { ...user };
  const jwtConfig = { algorithm: 'HS256', expiresIn: '12h' };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

module.exports = {
  create,
  verify,
};
