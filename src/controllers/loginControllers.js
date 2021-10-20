const { login } = require('../services/loginServices');

const loginUser = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const validyUser = await login(email, password);

    return response.status(validyUser.status).json(validyUser.message);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  loginUser,
};