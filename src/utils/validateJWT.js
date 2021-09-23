const jwt = require('jsonwebtoken');
const errorMessages = require('./errorMessages');
const httpStatus = require('./httpStatus');

const usersModel = require('../models/usersModel');

const SECRET = 'supersenhaativar1234';

const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) { 
      return res.status(httpStatus.unauthorized).json({ message: errorMessages.missingToken });
    }

    const { email } = jwt.verify(token, SECRET);

    const user = await usersModel.getByEmail(email);

    req.user = user;

    next();
  } catch (_e) {
    res.status(httpStatus.unauthorized).json({ message: errorMessages.jwtMalformed });
  }
};

module.exports = {
  validateJWT,
};
