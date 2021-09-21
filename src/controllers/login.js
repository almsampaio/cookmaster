const loginService = require('../services/login');

const login = async (req, res, next) => {
  const { password, email } = req.body;

  const { error, result } = await loginService.login(email, password);

  if (error) return next(error);

  return res.status(200).json(result);
};

module.exports = {
  login,
};
