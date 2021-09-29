const jwt = require('jsonwebtoken');
require('dotenv').config();

const password = 'mySuperMegaSecretToken';

const jwtconfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const getToken = (user) => {
  const token = jwt.sign({ data: user }, password, jwtconfig);
  return token;
};

module.exports = getToken;