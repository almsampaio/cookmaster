const loginModel = require('../models/login');
const { clientErrors } = require('../utils/httpStatusCodes');

const login = async (email, password) => {
  const successLogin = await loginModel.existsLogin(email, password);
  if (!successLogin) {
    const response = {
      statusCode: clientErrors.unauthorized, message: 'Incorrect username or password',
    };
    return response;
  }
  return successLogin;
};

module.exports = { login };