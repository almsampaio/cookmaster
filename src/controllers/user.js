const userService = require('../service/user');

const newUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userService.newUser(name, email, password);
  return res.status(201).json(result);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.login(email, password);
  return res.status(200).json({ token: result });
};

const getAll = async (_req, res) => {
  const result = await userService.getAll();
  return res.status(200).json(result);
};

module.exports = {
  newUser,
  login,
  getAll,
};