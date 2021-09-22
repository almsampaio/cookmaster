const loginService = require('../services/loginService');

const makeLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const { status, response } = await loginService.askLogin(email, password);
  return res.status(status).json(response);
};

module.exports = makeLogin;