const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userService.createUser(name, email, password);

  return res.status(result.status).json({ user: result.message });
};

module.exports = { createUser };
