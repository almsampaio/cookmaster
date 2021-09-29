const { StatusCodes } = require('http-status-codes');

const Model = require('../Model');
const validations = require('../utils/validations');

async function register(userToRegister) {
  const invalidUser = validations.userFields(userToRegister).error;
  if (invalidUser) {
    const statusCode = StatusCodes.BAD_REQUEST;
    return { statusCode, error: { message: 'Invalid entries. Try again.' } };
  }
  
  const emailExists = await Model.users.checkEmailExistence(userToRegister.email);
  if (emailExists) {
    const statusCode = StatusCodes.CONFLICT;
    return { statusCode, error: { message: 'Email already registered' } };
  }

  const insertedUser = await Model.users.insertOneUser(userToRegister);
  const statusCode = StatusCodes.OK;
  return { statusCode, payload: insertedUser };
}

module.exports = {
  register,
};
