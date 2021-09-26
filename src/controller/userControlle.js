const userService = require('../service/userService');

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userService.addUser(name, email, password);

  if (user.message) return res.status(user.status).json({ message: user.message });

  res.status(201).json({ user });
};

const findAll = async (_req, res) => {
  const user = await userService.findAll();

  res.status(200).json({ user });
};

module.exports = {
  addUser,
  findAll,
};