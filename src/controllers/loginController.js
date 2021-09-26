const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, result } = await loginService.login(email, password);
  return res.status(status).json(result);
};

module.exports = { login };
