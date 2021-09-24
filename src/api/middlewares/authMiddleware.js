const jwt = require('jsonwebtoken');

const SECRET = 'segredinhosecreto';

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

  const payload = jwt.verify(token, SECRET);

  req.user = payload;

  next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};