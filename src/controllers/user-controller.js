const userService = require('../services/user-service');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userData = await userService.createUser(name, email, password);

  return res.status(201).json({ user: userData });
};

module.exports = { createUser };
