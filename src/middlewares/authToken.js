const { verifyToken } = require('../utils/token');

const authToken = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    const err = { code: 401, isError: true, message: 'missing auth token' };

    return next(err);
  }

  const decodedToken = verifyToken(token);

  if (decodedToken.isError) return next(decodedToken);

  req.token = decodedToken;

  next();
};

module.exports = authToken;
