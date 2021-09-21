const userService = require('../services/users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await userService.createUser(name, email, password);
  if (newUser.code) return res.status(newUser.code).json(newUser.errorInfo);

  return res.status(201).json(newUser);
};

module.exports = {
  createUser,
};