const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const role = 'user';
  const { user, message, code } = await userService.createUser(name, email, password, role);
  if (message) return res.status(code).json(message);

  return res.status(201).json({ user });
};

module.exports = { createUser };