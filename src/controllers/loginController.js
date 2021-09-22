const loginService = require('../services/loginService');

async function login(req, res) {
  const { email, password } = req.body;
  const loginResult = await loginService.login({ email, password });
  if (loginResult.message) {
    return res.status(loginResult.code).json({ message: loginResult.message });
  }
  res.status(loginResult.code).json({ token: loginResult.token });
}

module.exports = {
  login,
};