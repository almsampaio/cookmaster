const jwt = require('../utils/jwt');
const { unauthorized } = require('../utils/httpStatus');

const authToken = (request, _response, next) => {
  const { authorization } = request.headers;

  if (!authorization) return next({ status: unauthorized, message: 'missing auth token' });

  const { err, decode } = jwt.verifyToken(authorization);

  if (err) return next(err);

  request.decodeToken = decode;

  next();
};

module.exports = authToken;
