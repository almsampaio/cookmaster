const jwt = require('../utils/jwt');

const authToken = (request, _response, next) => {
  const { authorization } = request.headers;

  const { err, decode } = jwt.verifyToken(authorization);

  if (err) return next(err);

  request.decodeToken = decode;

  next();
};

module.exports = authToken;
