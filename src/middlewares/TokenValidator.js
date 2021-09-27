const jwt = require('jsonwebtoken');
const SECRET = require('../CONSTANTS/SECRET');

function TokenValidator(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'jwt malformed' });

  try {
    const decoded = jwt.verify(authorization, SECRET);
    console.log(decoded);
    req.validated = decoded;
    next();
  } catch (error) {
    console.log(error);
    next({ message: error.message, statusCode: 401 });
  }
};

module.exports = TokenValidator;