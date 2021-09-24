const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = 'Xablau';

const authValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const { email } = jwt.verify(token, SECRET);
    const user = await userModel.findUserEmail(email);
    req.user = user;
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  authValidation,
};