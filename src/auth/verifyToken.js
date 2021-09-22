const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

const SECRET = 'meusupersegredo';

const verify = (token) => {
  const payload = jwt.verify(token, SECRET);
  return payload;
}; 

const verifyAuthorization = rescue(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' }); 
  }
  try {
    const payload = verify(authorization);
    req.payload = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  } 
});

module.exports = {
  verifyAuthorization,
};