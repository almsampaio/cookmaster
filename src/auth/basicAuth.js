const jwt = require('jsonwebtoken');
const { jwtError, withoutTokenError } = require('../utils/errors');

require('dotenv').config();

const secret = process.env.SECRET || 'minhasenhasupersecreta';

const verify = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
}; 

const authBasic = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
 return res.status(withoutTokenError.error.status)
  .json({ message: withoutTokenError.error.message }); 
}
  try {
    const payload = verify(authorization);
    req.payload = payload;
    return next();
  } catch (error) {
    res.status(jwtError.error.status).json({ message: jwtError.error.message });
  }
};

module.exports = { authBasic };