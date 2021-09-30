const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../../../fake.env');

function generateJWT(req, res, next) {
  const { email, role } = req.infos;
  const infos = { email, role };
  try {
    const jwtConfig = {
      // expiresIn: '1h',
      algorithm: 'HS256',
    };
    const token = jwt.sign(infos, SECRET, jwtConfig);
    const statusCode = StatusCodes.OK;
    const payload = { token };
    return res.status(statusCode).json(payload);
  } catch (err) {
    console.log(err);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    next({ statusCode, error: { message: getReasonPhrase(statusCode) } });
  }
}

module.exports = generateJWT;