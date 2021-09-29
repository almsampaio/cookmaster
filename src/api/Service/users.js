const { StatusCodes } = require('http-status-codes');

async function register() {
  const statusCode = StatusCodes.OK;
  return { statusCode, payload: { message: 'From Services' } };
}

module.exports = {
  register,
};
