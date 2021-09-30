const { StatusCodes } = require('http-status-codes');

const Model = require('../Model');
const validations = require('../utils/validations');

async function register(userToRegister) {
  const invalidUser = validations.userFields(userToRegister).error;
  if (invalidUser) {
    const statusCode = StatusCodes.BAD_REQUEST;
    return { statusCode, payload: { error: { message: 'Invalid entries. Try again.' } } };
  }

  const emailExists = await Model.users.checkEmailExistence(userToRegister.email);
  if (emailExists) {
    const statusCode = StatusCodes.CONFLICT;
    return { statusCode, payload: { error: { message: 'Email already registered' } } };
  }

  const user = await Model.users.insertOneUser(userToRegister);
  const statusCode = StatusCodes.CREATED;
  return { statusCode, payload: { user } };
}

module.exports = {
  register,
};
