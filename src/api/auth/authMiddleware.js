const jwt = require('jsonwebtoken');

const SECRET = 'meusupersegredo';
const ERROR_JWT = { error: { status: 401, message: 'jwt malformed' } };
const ERROR_TOKEN = { error: { status: 401, message: 'missing auth token' } };

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(ERROR_TOKEN.error.status).json({ message: ERROR_TOKEN.error.message });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    // console.log(payload);
    req.payload = payload;
    return next();
  } catch (error) {
    res.status(ERROR_JWT.error.status).json({ message: ERROR_JWT.error.message });
  }
};

module.exports = {
  authMiddleware,
};
