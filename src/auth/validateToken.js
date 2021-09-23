const jwt = require('jsonwebtoken');

const secret = 'supersegredosecreto';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = jwt.verify(authorization, secret);

    if (!token) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  validateToken,
};
