const invalidData = require('../utils/invalidData');
const verifyToken = require('./verifyToken');

const UNAUTHORIZED = 401;

const validJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) throw invalidData('missing auth token', UNAUTHORIZED);

  const validVerifyToken = verifyToken(token);

  if (validVerifyToken.message) throw invalidData(validVerifyToken.message, UNAUTHORIZED);

  const { _id: id, role } = validVerifyToken;

  req.user = {
    id,
    role,
  };
  next();
};

module.exports = validJWT;
