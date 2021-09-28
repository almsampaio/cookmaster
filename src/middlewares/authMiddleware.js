const jwt = require('jsonwebtoken');

const SECRET = 'palavrasecreta';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { userPayload: { _id } } = jwt.verify(token, SECRET);
    req.userId = _id;
    next();
  } catch (_e) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    res.status(401).json({ message: 'jwt malformed' });
  }
};
