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

const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, SECRET);

    return decode;
  } catch (error) {
    const err = { isError: true, code: 401, message: 'jwt malformed' };

    return err;
  }
};

module.exports = { getToken, verifyToken };