const jwt = require('jsonwebtoken');
const secret = require('./secret');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

module.exports = generateToken;
