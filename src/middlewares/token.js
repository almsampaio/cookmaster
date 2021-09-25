const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersModels = require('../models/usersModels');

const myPreciousPassword = 'ringToRuleThemAll';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const newToken = (dataWithoutPassword) => {
  const userToken = jwt.sign(dataWithoutPassword, myPreciousPassword, jwtConfig);
  return userToken;
};

const tokenValidation = async (request, response, next) => {
  const userToken = request.headers.authorization;
  if (!userToken) {
    response.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(userToken, myPreciousPassword);

    const userVerify = await usersModels.searchByEmail(payload.email);
    if (!userVerify || userVerify === undefined) {
      return response.status(401).json({ message: 'jwt malformed' });
    }

    const { password, ...dataWithoutPassword } = userVerify;

    const { _id } = dataWithoutPassword;
    request.user = _id;

    next();
} catch (err) {
    return response.status(401).json({ message: err.message });
  }
};

module.exports = {
  newToken,
  tokenValidation,
};
