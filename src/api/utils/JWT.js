const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const jwt = require('jsonwebtoken');

function generate({ email, role }) {
  const payload = { email, role };
  try {
    const SECRET = 'gostoMaisDeUsarDotEnv';
    const jwtConfig = {
      // expiresIn: '1h',
      algorithm: 'HS256',
    };
    const token = jwt.sign(payload, SECRET, jwtConfig);
    return token;
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { statusCode, error: { message: getReasonPhrase(statusCode) } };
  }
}

module.exports = {
  generate,
};