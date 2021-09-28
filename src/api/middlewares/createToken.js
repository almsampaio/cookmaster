const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createToken = (userData) => {
  const token = jwt.sign(userData, secret, jwtConfig);

  return token;
};

module.exports = createToken;
