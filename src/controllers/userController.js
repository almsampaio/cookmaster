const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const role = 'user';
  const user = await userService.createUser(name, email, password, role);

  return res.status(201).json({ user });
};

module.exports = { createUser };