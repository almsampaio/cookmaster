const jwt = require('jsonwebtoken');

const userModel = require('../models/usersModel');

const secret = 'secretdetoken';
const BAD_REQUEST = 401;

const jwtValid = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(BAD_REQUEST).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findByEmail(decoded.data.email);
    if (!user) {
      return res.status(BAD_REQUEST).json({ message: 'User not found by this token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'jwt malformed' });
  }
};

module.exports = jwtValid;