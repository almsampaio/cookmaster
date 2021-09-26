const usersService = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  const { message, status, data } = await usersService.createUser(name, email, password, role);

  if (message) return res.status(status).json({ message });
  res.status(status).json(data);
};

module.exports = {
  createUser,
};
