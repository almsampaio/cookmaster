const jwt = require('jsonwebtoken');

/* function checkAdmin(username, password) {
  if (username === 'admin' && password === 's3nh4S3gur4???') return { data: username, admin: true };
  return { data: username };
} */

function generateJWT(infos) {
  const { user } = infos;
  const payload = {
    user,
  };
  const secret = 'nada';
  try {
    const jwtConfig = {
      // expiresIn: '1h',
      algorithm: 'HS256',
    };
    const token = jwt.sign(payload, secret, jwtConfig);
    return token;
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: 'Internal server error' };
  }
}

module.exports = generateJWT;