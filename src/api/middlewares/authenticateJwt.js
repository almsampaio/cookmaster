const rescue = require('express-rescue');
const JWT = require('jsonwebtoken');
const JwtMalformed = require('../errors/JwtMalformed');
const MissingAuthToken = require('../errors/MissingAuthToken');
const { JWT_SECRET } = require('../services/loginService');

const authenticateJwt = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;

  if (token === undefined) throw new MissingAuthToken();
  let userAuthenticate = null;
  try {
    userAuthenticate = JWT.verify(token, JWT_SECRET);
  } catch (error) {
    throw new JwtMalformed();
  }

  req.userAuthenticate = userAuthenticate;

  return next();
});

module.exports = {
  authenticateJwt,
};
