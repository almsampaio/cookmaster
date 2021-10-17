const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');
const AppError = require('../helpers/appError');

async function auth(request, response, next) { 
  try {
    if (!request.headers.authorization) throw new AppError('missing auth token');
    const payload = jwt.verify(request.headers.authorization, jwtSecret);
    request.user = payload;
    next();
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }
}

module.exports = auth;