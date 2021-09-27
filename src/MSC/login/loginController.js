const { loginService } = require('./loginService');

async function loginController(req, res) {
  const { email, password } = req.body;
  const tryLogin = await loginService(email, password);
  if (tryLogin.statusCode) {
    const { statusCode, message } = tryLogin;
    return res.status(statusCode).json({ message });
  }
  return res.status(200).json({ message: 'Funcionando em /login pelo controller' });
}

module.exports = {
  loginController,
};
