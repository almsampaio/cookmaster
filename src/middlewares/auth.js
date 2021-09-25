const jwt = require('jsonwebtoken');
const errors = require('../errors');
const UserService = require('../services/UserService');

const SECRET = 'secretstring';

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: errors.tokenNotFound });
  }

  try {
    const { data } = jwt.verify(authorization, SECRET);

    if (!data) {
      return res.status(401).json({ error: errors.invalidToken });
    }

    const user = UserService.findUserByEmail(data.email);

    if (!user) {
      return res.status(404).json({ message: errors.userNotFound });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
