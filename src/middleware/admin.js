const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

const secret = 'meusegredo';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });

    const decoded = jwt.verify(token, secret);
    console.log(decoded.user.email);

    const user = await usersModel.findEmail(decoded.user.email);
    req.user = decoded;
    console.log(user, 'admin');
    if (user.role !== 'admin' && user.userId !== decoded.user.userId) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};
