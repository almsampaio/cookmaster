const jwt = require('jsonwebtoken');

const JWT_SECRET = 'test123';

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(authorization, JWT_SECRET);
    req.user = decoded.data;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
