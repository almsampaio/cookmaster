const rescue = require('express-rescue');
const UserService = require('../services/UserService');

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserService.create(name, email, password);

  return res.status(201).json({ user });
});

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await UserService.userLogin(email, password);

  return res.status(200).json({ token });
});

module.exports = {
  create,
  userLogin,
};