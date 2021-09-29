const { StatusCodes } = require('http-status-codes');

const validations = require('../utils/validations');

async function register(userToRegister) {
  const invalidUser = validations.userFields(userToRegister).error;
  if (invalidUser) {
    const statusCode = StatusCodes.BAD_REQUEST;
    return { statusCode, error: { message: 'Invalid entries. Try again.' } };
  }
  const statusCode = StatusCodes.OK;
  return { statusCode, payload: { message: 'From Services' } };
}

module.exports = {
  register,
};
