const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  const { status, message, user } = await usersService.create(name, email, password, role);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, message, token } = await usersService.login(email, password);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ token });
};

module.exports = {
  createUser,
  login,
};
