const jwt = require('jsonwebtoken');

const secret = 'superseguro123';

const UNAUTHORIZED_STATUS = 401;

const validateToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;

    next();
  } catch (_e) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateToken,
};
