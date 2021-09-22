const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'secrettoken';

const validateJWT = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const userData = jwt.verify(authorization, secret);
    const user = await usersModel.findUserByName(userData.data.name);
    if (!user) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  validateJWT,
};