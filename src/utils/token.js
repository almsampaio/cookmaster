const Jwt = require('jsonwebtoken');

const SECRET = 'Antes tarde do que nunca';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '60m',
};

const checkIfTokenExists = (token) => {
  if (!token) {
    const error = new Error('missing auth token');
    error.code = 401;
    throw error;
  }
};

const isTokenValid = (token) => {
  try {
    Jwt.verify(token, SECRET);
  } catch (err) {
    err.message = 'jwt malformed';
    err.code = 401;
    throw err;
  }
};

const createToken = (user) => {
  const { password: _, ...payload } = user;
  const token = Jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  checkIfTokenExists(token);
  isTokenValid(token);
  const payload = Jwt.verify(token, SECRET);
  req.user = payload;
  next();
};

module.exports = {
  createToken,
  validateToken,
};
