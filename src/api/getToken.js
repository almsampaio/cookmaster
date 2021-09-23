const jwt = require('jsonwebtoken');

const getToken = (email, password) => {
    const dataToken = { email, password };
    const secret = 'secretToken';
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: dataToken }, secret, jwtConfig);
    return token;
  };
  module.exports = { getToken };