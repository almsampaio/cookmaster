const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

async function auth(request, response, next) { 
  try {
    const payload = jwt.verify(request.headers.authorization, jwtSecret);
    request.user = payload;
    next();
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }
}

module.exports = auth;