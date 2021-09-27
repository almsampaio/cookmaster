const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET || 'senhaSecreta';

function createToken(user) {
  const { password: _, ...payload } = user;
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return { token };
}

module.exports = { createToken };