const jwt = require('jsonwebtoken');

const secret = 'segredosupersecreto';

const createToken = (user) => {
  const { id, email, role } = user;
  const payload = { id, email, role };
  const jwtConfig = {
    expiresIn: '14d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  return { token };
};

module.exports = { createToken };
