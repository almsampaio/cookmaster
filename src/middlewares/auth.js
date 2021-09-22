const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');

const SECRET = 'secret';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'missing auth token' });

    const { email } = jwt.verify(token, SECRET);

    const user = await usersModel.findUserByEmail(email);

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = auth;
