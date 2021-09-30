const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { SECRET } = require('../../../fake.env');

function validateJWT(req, _res, next) {
  const { authorization } = req.headers;
  const statusCode = StatusCodes.UNAUTHORIZED;

  if (!authorization) return next({ statusCode, error: { message: 'missing auth token' } });

  try {
    const decoded = jwt.verify(authorization, SECRET);
    req.validated = decoded;
    next();
  } catch (error) {
    console.log(error);
    next({ statusCode, error: { message: 'jwt malformed' } });
  }
}

module.exports = validateJWT;
