const usersServices = require('../services/usersService');

const userLogin = async (req, res, _next) => {
  const login = req.body;
  const { status, result } = await usersServices.loginUser(login);
  return res.status(status).json(result);
};

module.exports = {
  userLogin,
};
