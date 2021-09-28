const jwt = require('jsonwebtoken');

const SECRET = 'xablau';

function createToken(user) {
  const { password: _, ...payload } = user;
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '15d',
  };
  const token = jwt.sign({ data: payload }, SECRET, jwtConfig);
  return { token };
}

module.exports = { createToken };