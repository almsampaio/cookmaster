const jwt = require('jsonwebtoken');

const generateToken = (email) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const secret = '1234';
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};