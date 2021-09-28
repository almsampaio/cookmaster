const jwt = require('jsonwebtoken');

const errorHandling = (status, message) => ({ status, message });

/* Source: https://github.com/tryber/sd-09-cookmaster-v2/tree/Henrique-Moura-cookmaster */
const tokenValidation = async (req, res, next) => {
  const secret = 'mateus';
  const token = req.headers.authorization;

  if (!token) return next(errorHandling(401, 'missing auth token'));

  try {
    const payload = jwt.verify(token, secret);
    const { _id: id } = payload;

    req.userId = id;
  } catch (_error) {
    return next(errorHandling(401, 'jwt malformed'));
  }

  next();
};

module.exports = {
  tokenValidation,
};