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

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await usersService.userLogin(email, password);

  if (!result.token) return res.status(401).json({ message: result.message });

  return res.status(200).json({ token: result.token });
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.userAdmin;

  const { message, createdUser } = await usersService.create(name, email, password, role);

  if (!createdUser) return res.status(409).json({ message });

  return res.status(201).json({ user: createdUser });
};

module.exports = {
  create,
  getUsers,
  userLogin,
  createAdmin,
};
