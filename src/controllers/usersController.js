const usersService = require('../services/usersService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { error, user } = await usersService.createUser(name, email, password);
  if (error) return res.status(error.status).json({ message: error.message });
  return res.status(201).json({ user });
};

module.exports = {
  createUser,
};