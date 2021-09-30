const jwt = require('jsonwebtoken');

const password = 'secret';

const jwtconfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const getToken = (user) => {
  const userWithoutPassword = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign({ data: userWithoutPassword }, password, jwtconfig);
  return token;
};

module.exports = getToken;