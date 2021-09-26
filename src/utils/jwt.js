const jwt = require('jsonwebtoken');
const { unauthorized } = require('./httpStatus');

const SECRET = '268332693e582980b413ebbe253ae50e';

exports.generateToken = ({ email, role, _id }) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const payload = { email, role, _id };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
};

exports.verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, SECRET);

    return { decode };
  } catch (error) {
    const err = { status: unauthorized, message: 'jwt malformed' };
    return { err };
  }
};
