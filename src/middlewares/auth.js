const jwt = require('jsonwebtoken');
const models = require('../models');

const errorMessages = require('../utils/errorMessages');

const JWT_SECRET = '123';

module.exports = async (req, _res, next) => {
const token = req.headers.authorization;

if (!token) next(errorMessages.MISSING_AUTH_TOKEN);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await models.getByEmail(payload.email);

    if (!user) next(errorMessages.JWT_MALFORMED);

    req.user = payload;
    next();
  } catch (e) {
    next(errorMessages.JWT_MALFORMED);
  }
};