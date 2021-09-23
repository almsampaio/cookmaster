const jwt = require('jsonwebtoken');

const secret = 'mateus';

const errorHandling = (status, message) => ({ status, message });

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    jwt.verify(authorization, secret);
  } catch (_error) {
    next(errorHandling(401, 'jwt malformed'));
  }

  next();
};

module.exports = {
  tokenValidation,
};