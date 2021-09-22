const jwt = require('jsonwebtoken');
const models = require('../models');

const { JWT_MALFORMED, UNAUTHORIZED_MISSING_TOKEN } = require('../utils/errorMessages');

const JWT_SECRET = '123';

module.exports = async (req, _res, next) => {
const token = req.headers.authorization;

if (!token) next(UNAUTHORIZED_MISSING_TOKEN);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await models.getByEmail(payload.email);

    if (!user) next(JWT_MALFORMED);

    req.user = payload;
    next();
  } catch (e) {
    next(JWT_MALFORMED);
  }
};