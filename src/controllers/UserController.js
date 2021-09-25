const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  const user = await UserService.createUser({ name, email, password, role });

  res.status(201).json({ user });
};

module.exports = { createUser };
