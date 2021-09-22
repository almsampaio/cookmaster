const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const SECRET = 'loginsecret';
const UNAUTHORIZED_STATUS = 401;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: 'missing auth token' });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    const user = await userModel.findByEmail(payload);
    if (!user) {
      return res.status(UNAUTHORIZED_STATUS).json({ message: 'invalid user' });
    }
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  validateToken,
};
