const jwt = require('jsonwebtoken');

const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');

const {
  usersModel,
} = require('../models');

const SECRET = process.env.SECRET || 'secretPassword';

console.log('validateSECRET', SECRET);

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

  if (!token) {
    return res.status(UNAUTHORIZED)
      .json({ message: 'jwt malformed' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await usersModel.getUserByEmail(decoded.email);

    if (!user) {
      return res.status(UNAUTHORIZED)
        .json({ message: 'jwt malformed' });    
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: err.message });
  }
};
