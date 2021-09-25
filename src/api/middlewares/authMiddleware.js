const jwt = require('jsonwebtoken');

const SECRET = 'segredinhosecreto';

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return next({ code: 401, isError: true, message: 'missing auth token' });

    const payload = jwt.verify(token, SECRET);

    req.user = payload;

    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};