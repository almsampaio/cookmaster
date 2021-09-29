const jwt = require('jsonwebtoken');

const SECRET = 'senha';

const validToken = (userData) => {
  const jwtConfig = { algorithm: 'HS256' };

  const { password, name, ...payload } = userData;
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

const verifyToken = (token) => {
  if (!token) {
    const err = { status: 401, message: 'missing auth token' };
    throw err;
  }

  try {
    const userData = jwt.verify(token, SECRET);
    const { _id: userId, role } = userData;
    return { userId, role };
  } catch (error) {
    const err = { status: 401, message: error.message };
    throw err;
  }
};

module.exports = {
  validToken,
  verifyToken,
};