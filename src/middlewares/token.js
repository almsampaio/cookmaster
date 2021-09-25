const jwt = require('jsonwebtoken');
require('dotenv').config();

const myPreciousPassword = 'ringToRuleThemAll';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const newToken = (dataWithoutPassword) => {
  const userToken = jwt.sign(dataWithoutPassword, myPreciousPassword, jwtConfig);
  return userToken;
};

module.exports = {
  newToken,
};
