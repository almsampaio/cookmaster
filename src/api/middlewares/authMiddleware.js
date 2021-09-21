const jwt = require('jsonwebtoken');

const userModel = require('../models/userModels');

const SECRET = 'meusupersegredo';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { email } = jwt.verify(token, SECRET);

    const { _id } = await userModel.findByEmail(email);

    req.user = _id;

    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
}; 