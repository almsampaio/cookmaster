const rescue = require('express-rescue');
const LoginServices = require('../services/login');

const login = rescue(async (req, res) => {
  const { email, password } = req.body;

  const loged = await LoginServices.login(email, password);
  if (loged.message) return res.status(loged.code).json({ message: loged.message });
  res.status(200).json(loged);
});

module.exports = {
  login,
};
