const jwt = require('jsonwebtoken');
const model = require('../models/usersModel');

const secret = 'meusegredo';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  
  try {
    const decoded = jwt.verify(token, secret);

    const user = await model.findEmail(decoded.email);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { validateJWT };
