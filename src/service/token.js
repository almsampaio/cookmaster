const jwt = require('jsonwebtoken');
const errorObjects = require('../../utils/errorsObject');

const secret = '1234';

const generateToken = (userId) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ userId }, secret, jwtConfig);
  return token;
};

const verifyToken = (req, _res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || authToken === '') throw errorObjects.missingAuthToken;
  try { 
    const validToken = jwt.verify(authToken, secret);
    const { userId } = validToken;
    req.user = userId;
    next();
  } catch (error) {
    throw (errorObjects.jwtMalformed);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};