const jwt = require('jsonwebtoken');

const SECRET = 'segredo12346@secret654321';

const getToken = (payload) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
};

module.exports = { getToken };