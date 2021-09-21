const usersService = require('../services/usersService');

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

module.exports = {
  createUser,
  loginUser,
};