const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const { authorization: token } = req.headers;
  const secret = 'topsecrettoken';

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const { data } = jwt.verify(token, secret);

    req.user = data;
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateJWT,
};