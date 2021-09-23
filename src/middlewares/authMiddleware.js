const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

const SECRET = 'C3t$x7k4!YocfE$e';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: 'missing auth token' });
    }
    const { email } = jwt.verify(token, SECRET);
    const user = await usersModel.verifyEmail(email);
    req.user = user;
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};
