const jwt = require('jsonwebtoken');

const SECRET = '268332693e582980b413ebbe253ae50e';

exports.generateToken = ({ email, role }) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const payload = { email, role };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
};

exports.verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, SECRET);

    return decode;
  } catch (error) {
    const err = { status: 401, message: 'jwt malformed' };
    return err;
  }
};
