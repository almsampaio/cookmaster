const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');
const AppError = require('../helpers/appError');
const { findEmail } = require('../models/users');

async function authAdm(request, response, next) { 
  try {
    const payload = jwt.verify(request.headers.authorization, jwtSecret);
    const user = await findEmail(payload.email);
    if (user.role !== 'admin') throw new AppError('Only admins can register new admins');
    request.user = payload;
    next();
  } catch (error) {
    return response.status(403).json({ message: error.message });
  }
}

module.exports = authAdm;