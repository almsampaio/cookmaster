const { StatusCodes } = require('http-status-codes');

const Model = require('../Model');
const { validations, JWT } = require('../utils');

async function logIN(user) {
  const invalidUser = validations.loginFields(user).error;
  if (invalidUser) {
    const statusCode = StatusCodes.UNAUTHORIZED;
    return { statusCode, payload: { error: { message: 'All fields must be filled' } } };
  }

  const canLogin = await Model.login.matchEmailPassword(user);
  if (canLogin.error) {
    const { statusCode, error } = canLogin;
    return { statusCode, payload: { error } };
  }
  if (!canLogin) {
    const statusCode = StatusCodes.UNAUTHORIZED;
    return { statusCode, payload: { message: 'Incorrect username or password' } };
  }
  const statusCode = StatusCodes.OK;
  const { email, role } = canLogin;
  const token = JWT.generate(email, role);
  return { statusCode, payload: { token } };
}

module.exports = {
  logIN,
};
