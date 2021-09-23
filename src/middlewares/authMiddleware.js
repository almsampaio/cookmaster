const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');

const SECRET = 'superSecret';

const authLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'missing auth token' });

    const { email } = jwt.verify(token, SECRET);

    const user = await UserModel.findByEmail(email) || {};

    req.user = user;

    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  authLogin,
};