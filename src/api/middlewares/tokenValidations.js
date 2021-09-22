const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function tokenValidations(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');

    const user = await userModel.findByEmail(decoded.data);

    if (!user) {
      return res
      .status(401)
      .json({ message: 'jwt malformated' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = tokenValidations;