const userService = require('../services/user');

const createUser = async (req, res) => {
  const { name, password, email } = req.body;

  console.log(name);
  const User = await userService.createUser(name, password, email);

  return res.status(201).json({ user: User });
};

module.exports = {
  createUser,
};