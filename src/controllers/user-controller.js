const userService = require('../services/user-service');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userData = await userService.createUser(name, email, password);

  return res.status(201).json({ user: userData });
};

const findEmail = async (_req, res) => {
  const searchEmail = await userService.findEmail();

  return res.status(200).json({ email: searchEmail });
};

module.exports = { createUser, findEmail };
