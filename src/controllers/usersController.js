const usersService = require('../services/usersService');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  const result = await usersService.create(name, email, password, role);
  const { message, createdUser } = result;

  if (message === 'Email already registered') {
    return res.status(409).json({ message });
  }

  if (!createdUser) return res.status(400).json({ message });

  return res.status(201).json({ user: createdUser });
};

const getUsers = async (req, res) => {
  const users = await usersService.getUsers();
  res.status(200).json({ users });
};

module.exports = {
  create,
  getUsers,
};
