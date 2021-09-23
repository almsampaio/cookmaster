const jwt = require('jsonwebtoken');

const userModel = require('../models/userModels');

const SECRET = 'meusupersegredo';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });

    const { email, userId } = jwt.verify(token, SECRET);

    const user = await userModel.findByEmail(email);
    req.user = user;
    if (user.role !== 'admin' && user.userId !== userId) {
            return res.status(401).json({ message: 'jwt malformed' });
    }
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
}; 