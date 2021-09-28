const loginModel = require('../models/loginModel');

const userLogin = async (request, response) => {
  const { email } = request.body;

  const login = await loginModel.userLogin(email);
  return response.status(200).json({ token: login });
};

module.exports = {
  userLogin,
};