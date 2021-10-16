const { login } = require('../services/loginServices');

const loginUser = async (request, response) => {
  const { email, password } = request.body;
  const validyUser = await login(email, password);

  return response.status(validyUser.status).json(validyUser.message);
};

module.exports = {
  loginUser,
};