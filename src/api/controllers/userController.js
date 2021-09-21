const userService = require('../services/userService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';

  const { status, message, user } = await userService.create(name, email, password, role);
  if (!user) return res.status(status).json({ message });
  res.status(status).json({ user });
};

module.exports = {
  create,
};