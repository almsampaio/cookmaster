const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const result = await userService.createUser(username, password);

  return res.status(result.status).json({ message: result.message });
};

module.exports = { createUser };