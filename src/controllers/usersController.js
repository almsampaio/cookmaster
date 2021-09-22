const usersService = require('../services/usersService');
const { adminError } = require('../utils/errors');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { error, user } = await usersService.createUser(name, email, password);
  if (error) return res.status(error.status).json({ message: error.message });
  return res.status(201).json({ user });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { error, token } = await usersService.loginUser(email, password);
  if (error) return res.status(error.status).json({ message: error.message });
  return res.status(200).json({ token });
};

const addAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.payload;
  if (role !== 'admin') {
    return res.status(adminError.error.status).json({ message: adminError.error.message });
  }
  const user = await usersService.addAdmin(name, email, password);
  return res.status(201).json(user);
};

module.exports = {
  createUser,
  loginUser,
  addAdmin,
};