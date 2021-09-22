const jwt = require('jsonwebtoken');
const { unauthorizedError } = require('../validations/Errors');
const { secret } = require('../validations/auth/secret');

exports.validate = async ({ token }) => {
  if (!token) throw unauthorizedError('missing auth token');
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (_err) {
    throw unauthorizedError('jwt malformed');
  }
};