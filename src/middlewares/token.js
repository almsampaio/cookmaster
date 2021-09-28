const jwt = require('jsonwebtoken');
require('dotenv').config();

const myPassword = 'ringToRuleThemAll';

const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const token = (dataWithoutPassword) => {
  const userToken = jwt.sign(dataWithoutPassword, myPassword, jwtConfig);
  return userToken;
};

module.exports = {
  token,
};