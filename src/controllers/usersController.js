const usersService = require('../services/usersService');

module.exports = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  const { status, message, user } = await usersService.create(name, email, password, role);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ user });
};
