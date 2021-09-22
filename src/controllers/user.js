const userService = require('../services/user');

const createUser = async (req, res) => {
  const { name, password, email } = req.body;

  const User = await userService.createUser(name, password, email);

  return res.status(201).json({ user: User });
};

const genToken = async (req, res) => {
  const { email } = req.body;
  const token = await userService.genToken(email);
  return res.status(200).json({ token });
};

module.exports = {
  createUser,
  genToken,
};