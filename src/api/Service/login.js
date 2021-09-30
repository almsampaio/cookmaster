const { StatusCodes } = require('http-status-codes');

const Model = require('../Model');
const { validations } = require('../utils');

async function logIN(user) {
  const invalidUser = validations.loginFields(user).error;
  if (invalidUser) {
    const statusCode = StatusCodes.UNAUTHORIZED;
    return { statusCode, error: { message: 'All fields must be filled' } };
  }

  const canLogin = await Model.login.matchEmailPassword(user);
  if (canLogin.error) {
    const { statusCode, error } = canLogin;
    return { statusCode, error };
  }
  if (!canLogin) {
    const statusCode = StatusCodes.UNAUTHORIZED;
    return { statusCode, error: { message: 'Incorrect username or password' } };
  }
  return canLogin;
}

module.exports = {
  logIN,
};
