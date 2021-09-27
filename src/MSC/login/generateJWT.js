const jwt = require('jsonwebtoken');
const SECRET = require('../../CONSTANTS/SECRET');

/* function checkAdmin(username, password) {
  if (username === 'admin' && password === 's3nh4S3gur4???') return { data: username, admin: true };
  return { data: username };
} */

function generateJWT({ email, role }) {
  const payload = { email, role };

  try {
    const jwtConfig = {
      // expiresIn: '1h',
      algorithm: 'HS256',
    };
    const token = jwt.sign(payload, SECRET, jwtConfig);
    return token;
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: 'Internal server error' };
  }
}

module.exports = generateJWT;